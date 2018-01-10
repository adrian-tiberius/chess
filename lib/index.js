import { WHITE, BLACK, PieceTypes } from './constants';
import FenParser from './fen.parser';
import {
  getPositionsBetween,
  sanToPosition,
  getRowColumnFromPosition
} from './utils';
import { Empty } from './pieces';

export default function Chess(fenString) {
  let board = [];
  let fenBoard = '';
  let currentPlayer = WHITE;
  let isEnPassant = false;

  const capturedPieces = {
    [WHITE]: [],
    [BLACK]: []
  };
  let moves = [];
  let isCheck = false;
  let isCheckMate = false;

  if (fenString) {
    loadFen(fenString);
  }

  function loadFen(fen) {
    let player;
    let enPassantSan;
    board.length = 0;
    ({ fenBoard, board, player, enPassantSan } = FenParser.parse(fen));

    if (player) {
      currentPlayer = player === 'w' ? WHITE : BLACK;
    }
    updateBoard();

    if (enPassantSan) {
      // parts[3] = En passant
      if (enPassantSan !== '-') {
        const enPassantPosition = sanToPosition(enPassantSan);
        board[enPassantPosition].isEnPassant = true;
        isEnPassant = true;
        const { row, column } = getRowColumnFromPosition(enPassantPosition);
        const targetPosition = row === 2 ? 24 + column : 32 + column;
        updateAttackPosition(
          board[targetPosition + 1].getPiece(),
          targetPosition + 1
        );
        updateAttackPosition(
          board[targetPosition - 1].getPiece(),
          targetPosition - 1
        );
      }
    }
  }

  function reset() {
    currentPlayer = WHITE;
    loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    currentPlayer = WHITE;
    capturedPieces[WHITE] = [];
    capturedPieces[BLACK] = [];
    moves = [];
  }

  function move(from, to) {
    const fromCell = board[from];
    const fromPiece = fromCell.getPiece();
    const fromType = fromPiece.getType();
    const castly = [];
    if (!isValidMove(from, to)) {
      return false;
    }
    if (
      fromType === PieceTypes.KING &&
      ((from === 4 && (to === 6 || to === 2)) ||
        (from === 60 && (to === 58 || to === 62)))
    ) {
      // castling - move rook
      const direction = from > to ? 1 : -1;
      const rookPosition = direction > 0 ? from - 4 : from + 3;
      const rookCell = board[rookPosition];
      const rookPiece = rookCell.getPiece();
      const targetPosition = from - direction;
      const targetCell = board[targetPosition];
      targetCell.setPiece(rookPiece);
      rookCell.setPiece(Empty());
      rookPiece.move(targetPosition);
      castly.push(rookPosition);
      castly.push(targetPosition);
    }
    const toCell = board[to];
    const toPiece = toCell.getPiece();
    if (toPiece.getType() !== PieceTypes.EMPTY) {
      capturedPieces[currentPlayer].push(toPiece);
    } else if (fromType === PieceTypes.PAWN && toCell.isEnPassant) {
      const direction = currentPlayer === WHITE ? 1 : -1;
      const cell = board[to - 8 * direction];
      capturedPieces[currentPlayer].push(cell.getPiece());
      cell.setPiece(Empty());
    } else if (fromType === PieceTypes.KING) {
      fromPiece.setCastling('');
    } else if (fromType === PieceTypes.ROOK) {
      const kingPosition = getCurrentPlayerKingPosition();
      const kingPiece = board[kingPosition].getPiece();
      const castling = kingPosition < from ? 'k' : 'q';
      const newCastling = kingPiece
        .getCastling()
        .replace(
          currentPlayer === WHITE ? castling.toUpperCase() : castling,
          ''
        );
      kingPiece.setCastling(newCastling);
    }
    toCell.setPiece(fromPiece);
    fromCell.setPiece(Empty());
    fromPiece.move(to);
    if (castly.length > 0) {
      moves.push([[from, to], castly]);
    } else {
      moves.push([from, to]);
    }

    togglePlayer();
    updateBoard();
    // check for en passant
    if (fromType === PieceTypes.PAWN && Math.abs(from - to) === 16) {
      isEnPassant = true;
      const positions = getPositionsBetween(from, to);
      board[positions[0]].isEnPassant = true;
      updateAttackPosition(board[to + 1].getPiece(), to + 1);
      updateAttackPosition(board[to - 1].getPiece(), to - 1);
    }
    return true;
  }

  function isValidMove(from, to) {
    const piece = board[from].getPiece();
    if (piece.getColor() !== currentPlayer) {
      return false;
    }
    const pieceMoves = piece.getValidMoves();
    if (pieceMoves.indexOf(to) === -1) {
      return false;
    }
    return true;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === WHITE ? BLACK : WHITE;
  }

  function updateBoard() {
    clearAttackPositions();
    updateAttackPositions();
    checkForMate();
  }

  function clearAttackPositions() {
    board.forEach(cell => {
      cell.clearAttacks();
      if (cell.isEnPassant) {
        cell.isEnPassant = false;
        isEnPassant = false;
      }
    });
  }

  function updateAttackPositions() {
    isCheck = false;
    const kings = [];
    board.forEach((cell, index) => {
      const piece = cell.getPiece();
      if (piece.getType() !== PieceTypes.EMPTY) {
        if (piece.getType() === PieceTypes.KING) {
          // update kings last
          kings.push(cell);
        } else {
          updateAttackPosition(piece, index);
        }
      }
    });
    kings.forEach(kingCell => {
      const piece = kingCell.getPiece();
      if (kingCell.isAttacked(piece.getColor() === WHITE ? BLACK : WHITE)) {
        isCheck = true;
      }
      updateAttackPosition(piece, kingCell.getPosition());
    });
  }

  function updateAttackPosition(piece, position) {
    piece.validateBoard(board);
    const attacks = piece.getValidAttacks();
    attacks.forEach(attackPosition => {
      const targetCell = board[attackPosition];
      targetCell.addAttack(piece.getColor(), position);
    });
  }

  function checkForMate() {
    // TODO
    isCheckMate = false;
    if (!isCheck) {
      return;
    }

    const kingPosition = getCurrentPlayerKingPosition();
    const kingCell = board[kingPosition];
    const kingPiece = kingCell.getPiece();
    // check if king has moves
    if (kingPiece.getValidMoves().length > 0) {
      return;
    }
    // check if attacker can be removed
    const attackersPositions = kingCell.getAttackers(
      currentPlayer === WHITE ? BLACK : WHITE
    );

    // if its more than 1 attacker, they cannot be removed or blocked in one move, so its mate
    if (attackersPositions.length === 1) {
      const attackerPosition = attackersPositions[0];
      const attackerCell = board[attackerPosition];
      if (attackerCell.isAttacked(currentPlayer)) {
        const attackerThreats = attackerCell.getAttackers(currentPlayer);
        if (
          attackerThreats.length > 1 ||
          board[attackerThreats[0]].getPiece().getType() !== PieceTypes.KING
        ) {
          return;
        }
      }

      // check if position between attacker and king can be filled
      const attackerPiece = attackerCell.getPiece();
      if (
        attackerPiece.getType() !== PieceTypes.KNIGHT &&
        attackerPiece.getType() !== PieceTypes.PAWN
      ) {
        const positions = getPositionsBetween(attackerPosition, kingPosition);
        if (anyPositionCanBeFilled(positions)) {
          return;
        }
      }
    }

    isCheckMate = true;
  }

  function getCurrentPlayerKingPosition() {
    for (let i = 0; i < board.length; i += 1) {
      const piece = board[i].getPiece();
      if (
        piece.getType() === PieceTypes.KING &&
        piece.getColor() === currentPlayer
      ) {
        return i;
      }
    }
    return -1;
  }

  function anyPositionCanBeFilled(positions) {
    for (let i = 0; i < board.length; i += 1) {
      const piece = board[i].getPiece();
      if (
        piece.getColor() === currentPlayer &&
        piece.getType() !== PieceTypes.KING
      ) {
        const pieceMoves = piece.getValidMoves();
        for (let j = 0; j < pieceMoves.length; j += 1) {
          if (positions.indexOf(pieceMoves[j]) > -1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function getBoard() {
    return board;
  }

  function getFenBoard() {
    return fenBoard;
  }

  function getIsCheckMate() {
    return isCheckMate;
  }

  function getIsCheck() {
    return isCheck;
  }

  function getIsEnPassant() {
    return isEnPassant;
  }

  return {
    loadFen,
    move,
    getBoard,
    getFenBoard,
    getCurrentPlayer,
    reset,
    isValidMove,
    isCheck: getIsCheck,
    isCheckMate: getIsCheckMate,
    isEnPassant: getIsEnPassant
  };
}
