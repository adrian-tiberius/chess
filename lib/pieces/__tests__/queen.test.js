import Queen from '../queen';
import Chess from '../../index';
import { sortNumber } from './common';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const queen = Queen(WHITE);
  expect(queen.getColor()).toEqual(WHITE);
});

test('color', () => {
  const queen = Queen(BLACK);
  expect(queen.getColor()).toEqual(BLACK);
});

test('type', () => {
  const queen = Queen(BLACK);
  expect(queen.getType()).toEqual(PieceTypes.QUEEN);
});

test('getMoves from position 0 (top left margin)', () => {
  const queen = Queen(WHITE, 0);
  expect(queen.getMoves().sort(sortNumber)).toEqual([
    [], // up
    [8, 16, 24, 32, 40, 48, 56], // down
    [], // left
    [1, 2, 3, 4, 5, 6, 7], // right
    [],
    [],
    [],
    [9, 18, 27, 36, 45, 54, 63]
  ]);
});
test('getMoves from position 7 (top right margin)', () => {
  const queen = Queen(WHITE, 7);
  expect(queen.getMoves().sort(sortNumber)).toEqual([
    [],
    [15, 23, 31, 39, 47, 55, 63],
    [6, 5, 4, 3, 2, 1, 0],
    [],
    [],
    [],
    [14, 21, 28, 35, 42, 49, 56],
    []
  ]);
});
test('getMoves from position 56 (bottom left margin)', () => {
  const queen = Queen(WHITE, 56);
  expect(queen.getMoves().sort(sortNumber)).toEqual([
    [48, 40, 32, 24, 16, 8, 0],
    [],
    [],
    [57, 58, 59, 60, 61, 62, 63],
    [],
    [49, 42, 35, 28, 21, 14, 7],
    [],
    []
  ]);
});
test('getMoves from position 63 (bottom right margin)', () => {
  const queen = Queen(WHITE, 63);
  expect(queen.getMoves().sort(sortNumber)).toEqual([
    [55, 47, 39, 31, 23, 15, 7],
    [],
    [62, 61, 60, 59, 58, 57, 56],
    [],
    [54, 45, 36, 27, 18, 9, 0],
    [],
    [],
    []
  ]);
});

test('getMoves from position 28 (no margin)', () => {
  const queen = Queen(WHITE, 28);
  expect(queen.getMoves().sort(sortNumber)).toEqual([
    [20, 12, 4],
    [36, 44, 52, 60],
    [27, 26, 25, 24],
    [29, 30, 31],
    [19, 10, 1],
    [21, 14, 7],
    [35, 42, 49, 56],
    [37, 46, 55]
  ]);
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[3].getPiece().getValidMoves()).toEqual([]);
  expect(board[59].getPiece().getValidMoves()).toEqual([]);
});
