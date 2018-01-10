import Bishop from '../bishop';
import Chess from '../../index';
import { sortNumber, flatten } from './common';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const bishop = Bishop(WHITE);
  expect(bishop.getColor()).toEqual(WHITE);
});

test('color', () => {
  const bishop = Bishop(BLACK);
  expect(bishop.getColor()).toEqual(BLACK);
});

test('type', () => {
  const bishop = Bishop();
  expect(bishop.getType()).toEqual(PieceTypes.BISHOP);
});

test('getMoves from position 0 (top left margin)', () => {
  const bishop = Bishop(WHITE, 0);
  expect(flatten(bishop.getMoves()).sort(sortNumber)).toEqual(
    [9, 18, 27, 36, 45, 54, 63].sort(sortNumber)
  );
});
test('getMoves from position 7 (top right margin)', () => {
  const bishop = Bishop(WHITE, 7);
  expect(flatten(bishop.getMoves(7)).sort(sortNumber)).toEqual(
    [14, 21, 28, 35, 42, 49, 56].sort(sortNumber)
  );
});
test('getMoves from position 56 (bottom left margin)', () => {
  const bishop = Bishop(WHITE, 56);
  expect(flatten(bishop.getMoves(56)).sort(sortNumber)).toEqual(
    [49, 42, 35, 28, 21, 14, 7].sort(sortNumber)
  );
});
test('getMoves from position 63 (bottom right margin)', () => {
  const bishop = Bishop(WHITE, 63);
  expect(flatten(bishop.getMoves(63)).sort(sortNumber)).toEqual(
    [54, 45, 36, 27, 18, 9, 0].sort(sortNumber)
  );
});

test('getMoves from position 28 (no margin)', () => {
  const bishop = Bishop(WHITE, 28);
  expect(flatten(bishop.getMoves(28)).sort(sortNumber)).toEqual(
    [19, 10, 1, 21, 14, 7, 35, 42, 49, 56, 37, 46, 55].sort(sortNumber)
  );
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[2].getPiece().getValidMoves()).toEqual([]);
  expect(board[5].getPiece().getValidMoves()).toEqual([]);
  expect(board[58].getPiece().getValidMoves()).toEqual([]);
  expect(board[61].getPiece().getValidMoves()).toEqual([]);
});
