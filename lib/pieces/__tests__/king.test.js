import King from '../king';
import Chess from '../../index';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const king = King(WHITE);
  expect(king.getColor()).toEqual(WHITE);
});

test('color', () => {
  const king = King(BLACK);
  expect(king.getColor()).toEqual(BLACK);
});

test('type', () => {
  const king = King();
  expect(king.getType()).toEqual(PieceTypes.KING);
});

test('getMoves from position 0 (top left margin)', () => {
  const king = King(WHITE, 0);
  expect(king.getMoves().sort()).toEqual([1, 8, 9].sort());
});
test('getMoves from position 7 (top right margin)', () => {
  const king = King(WHITE, 7);
  expect(king.getMoves().sort()).toEqual([6, 14, 15].sort());
});
test('getMoves from position 56 (bottom left margin)', () => {
  const king = King(WHITE, 56);
  expect(king.getMoves().sort()).toEqual([48, 49, 57].sort());
});
test('getMoves from position 63 (bottom right margin)', () => {
  const king = King(WHITE, 63);
  expect(king.getMoves().sort()).toEqual([54, 55, 62].sort());
});

test('getMoves from position 28 (no margin)', () => {
  const king = King(WHITE, 28);
  expect(king.getMoves().sort()).toEqual(
    [20, 36, 27, 29, 19, 21, 35, 37].sort()
  );
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[4].getPiece().getValidMoves()).toEqual([]);
  expect(board[60].getPiece().getValidMoves()).toEqual([]);
});
