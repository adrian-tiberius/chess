import Piece from './piece';
import { getRowColumnFromPosition } from '../utils';
import { PieceTypes, WHITE, BLACK } from '../constants';

export default function King(color, position) {
  const piece = Piece(PieceTypes.KING, color);
  let castling = ''; // color === WHITE ? 'QK' : 'qk';
  const oppositeColor = color === WHITE ? BLACK : WHITE;
  move(position);

  function move(newPosition) {
    const moves = [];
    const { row, column } = getRowColumnFromPosition(newPosition);
    if (row > 0) {
      moves.push(newPosition - 8);
      if (column > 0) {
        moves.push(newPosition - 9);
      }
      if (column < 7) {
        moves.push(newPosition - 7);
      }
    }
    if (row < 7) {
      moves.push(newPosition + 8);
      if (column > 0) {
        moves.push(newPosition + 7);
      }
      if (column < 7) {
        moves.push(newPosition + 9);
      }
    }
    if (column > 0) {
      moves.push(newPosition - 1);
    }
    if (column < 7) {
      moves.push(newPosition + 1);
    }
    piece.setMoves(moves);
    piece.setAttacks(moves);
  }

  function validateBoard(board) {
    piece.validateBoard(board, validateMoves);
  }

  function getCastlingMoves(board) {
    const castlingMoves = [];
    castling.split('').forEach(char => {
      const direction = char.toLowerCase() === 'q' ? -1 : 1;
      const targetPosition = position + direction * 2;
      const targetCell = board[targetPosition];
      const betweenCell = board[position + direction];
      if (
        !betweenCell.isAttacked(oppositeColor) &&
        !targetCell.isAttacked(oppositeColor) &&
        betweenCell.getPiece().getType() === PieceTypes.EMPTY &&
        targetCell.getPiece().getType() === PieceTypes.EMPTY &&
        !(
          direction === -1 &&
          board[position - 3].getPiece().getType() !== PieceTypes.EMPTY
        )
      ) {
        castlingMoves.push(targetPosition);
      }
    });
    return castlingMoves;
  }

  function validateMoves(moves, board) {
    let pieceMoves = piece.validateMoves(moves, board);
    if (castling !== '') {
      pieceMoves = pieceMoves.concat(getCastlingMoves(board));
    }
    return pieceMoves.reduce((result, movePosition) => {
      if (!board[movePosition].isAttacked(oppositeColor)) {
        result.push(movePosition);
      }
      return result;
    }, []);
  }

  function setCastling(newCastling) {
    castling = newCastling;
  }

  function getCastling() {
    return castling;
  }

  return Object.assign({}, piece, {
    move,
    validateBoard,
    getCastling,
    setCastling
  });
}
