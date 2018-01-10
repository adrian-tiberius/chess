import Piece from './piece';
import { getRowColumnFromPosition } from '../utils';
import { PieceTypes } from '../constants';

export default function Knight(color, position) {
  const piece = Piece(PieceTypes.KNIGHT, color);
  move(position);

  function move(newPosition) {
    const moves = [];
    const { row, column } = getRowColumnFromPosition(newPosition);
    if (row > 0) {
      if (column > 1) {
        moves.push(newPosition - 10);
      }
      if (column < 6) {
        moves.push(newPosition - 6);
      }
    }
    if (row > 1) {
      if (column > 0) {
        moves.push(newPosition - 17);
      }
      if (column < 7) {
        moves.push(newPosition - 15);
      }
    }
    if (row < 7) {
      if (column > 1) {
        moves.push(newPosition + 6);
      }
      if (column < 6) {
        moves.push(newPosition + 10);
      }
    }
    if (row < 6) {
      if (column > 0) {
        moves.push(newPosition + 15);
      }
      if (column < 7) {
        moves.push(newPosition + 17);
      }
    }
    piece.setMoves(moves);
    piece.setAttacks(moves);
  }

  return Object.assign({}, piece, {
    move
  });
}
