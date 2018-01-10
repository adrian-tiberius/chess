import Piece from './piece';
import { NONE, PieceTypes } from '../constants';

export default function Empty() {
  const piece = Piece(PieceTypes.EMPTY, NONE);

  function move() {
    throw new Error('Empty piece cannot be moved');
  }

  return Object.assign({}, piece, {
    move
  });
}
