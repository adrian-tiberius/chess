import Piece from './piece';
import { getDiagonalMoves, getPerpendicularMoves } from '../utils';
import { PieceTypes } from '../constants';

export default function Queen(color, position) {
  const piece = Piece(PieceTypes.QUEEN, color);
  move(position);

  function move(newPosition) {
    const moves = [
      ...getPerpendicularMoves(newPosition),
      ...getDiagonalMoves(newPosition)
    ];
    piece.setMoves(moves);
    piece.setAttacks(moves);
  }

  return Object.assign({}, piece, {
    move
  });
}
