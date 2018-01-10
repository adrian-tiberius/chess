import Piece from './piece';
import { getPerpendicularMoves } from '../utils';
import { PieceTypes } from '../constants';

export default function Rook(color, position) {
  const piece = Piece(PieceTypes.ROOK, color);
  move(position);

  function move(newPosition) {
    const moves = getPerpendicularMoves(newPosition);
    piece.setMoves(moves);
    piece.setAttacks(moves);
  }

  return Object.assign({}, piece, {
    move
  });
}
