import Piece from '../piece';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const piece = Piece(PieceTypes.Empty, WHITE);
  expect(piece.getColor()).toEqual(WHITE);
});

test('color', () => {
  const piece = Piece(PieceTypes.Empty, BLACK);
  expect(piece.getColor()).toEqual(BLACK);
});

test('type', () => {
  const piece = Piece(PieceTypes.Empty);
  expect(piece.getType()).toEqual(PieceTypes.Empty);
});
