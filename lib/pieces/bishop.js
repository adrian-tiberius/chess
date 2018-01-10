import Piece from './piece';
import { getDiagonalMoves } from '../utils';
import { PieceTypes } from '../constants';

export default function Bishop(color, position) {
  const piece = Piece(PieceTypes.BISHOP, color);
  move(position);

  function move(newPosition) {
    const moves = getDiagonalMoves(newPosition);
    piece.setMoves(moves);
    piece.setAttacks(moves);
  }

  return Object.assign({}, piece, {
    move
  });
}
