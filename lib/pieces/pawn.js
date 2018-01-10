import Piece from './piece';
import { WHITE, PieceTypes } from '../constants';
import { getRowColumnFromPosition } from '../utils';

export default function Pawn(color, position) {
  const piece = Piece(PieceTypes.PAWN, color);
  move(position);

  function move(newPosition) {
    const direction = color === WHITE ? 1 : -1;
    const { row, column } = getRowColumnFromPosition(newPosition);
    const moves = [];
    if (row > 0 && row < 7) {
      moves.push(newPosition + 8 * direction);
    }
    if ((row === 1 && direction === 1) || (row === 6 && direction === -1)) {
      moves.push(newPosition + 16 * direction);
    }
    const attacks = [];
    if (column > 0) {
      attacks.push(newPosition + 7 * direction);
    }
    if (column < 7) {
      attacks.push(newPosition + 9 * direction);
    }
    piece.setMoves([moves]);
    piece.setAttacks(attacks);
  }

  function validateBoard(board) {
    piece.validateBoard(board, validateMoves);
  }

  function validateMoves(moves, board) {
    const pieceMoves = piece.validateMoves(moves, board);
    const attacks = piece.getAttacks();
    attacks.forEach(attackPosition => {
      const targetCell = board[attackPosition];
      const targetPiece = targetCell.getPiece();
      if (
        (targetPiece.getType() !== PieceTypes.EMPTY &&
          targetPiece.getColor() !== color) ||
        (targetPiece.getType() === PieceTypes.EMPTY && targetCell.isEnPassant)
      ) {
        pieceMoves.push(attackPosition);
      }
    });
    return pieceMoves;
  }

  return Object.assign({}, piece, {
    move,
    validateBoard
  });
}
