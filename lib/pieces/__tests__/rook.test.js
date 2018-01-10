import Rook from '../rook';
import Chess from '../../index';
import { sortNumber } from './common';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const rook = Rook(WHITE);
  expect(rook.getColor()).toEqual(WHITE);
});

test('color', () => {
  const rook = Rook(BLACK);
  expect(rook.getColor()).toEqual(BLACK);
});

test('type', () => {
  const rook = Rook(BLACK);
  expect(rook.getType()).toEqual(PieceTypes.ROOK);
});

test('getMoves from position 0 (top left margin)', () => {
  const rook = Rook(WHITE, 0);
  expect(rook.getMoves().sort(sortNumber)).toEqual([
    [],
    [8, 16, 24, 32, 40, 48, 56],
    [],
    [1, 2, 3, 4, 5, 6, 7]
  ]);
});
test('getMoves from position 7 (top right margin)', () => {
  const rook = Rook(WHITE, 7);
  expect(rook.getMoves().sort(sortNumber)).toEqual([
    [],
    [15, 23, 31, 39, 47, 55, 63],
    [6, 5, 4, 3, 2, 1, 0],
    []
  ]);
});
test('getMoves from position 56 (bottom left margin)', () => {
  const rook = Rook(WHITE, 56);
  expect(rook.getMoves().sort(sortNumber)).toEqual([
    [48, 40, 32, 24, 16, 8, 0],
    [],
    [],
    [57, 58, 59, 60, 61, 62, 63]
  ]);
});
test('getMoves from position 63 (bottom right margin)', () => {
  const rook = Rook(WHITE, 63);
  expect(rook.getMoves().sort(sortNumber)).toEqual([
    [55, 47, 39, 31, 23, 15, 7],
    [],
    [62, 61, 60, 59, 58, 57, 56],
    []
  ]);
});

test('getMoves from position 28 (no margin)', () => {
  const rook = Rook(WHITE, 28);
  expect(rook.getMoves().sort(sortNumber)).toEqual([
    [20, 12, 4],
    [36, 44, 52, 60],
    [27, 26, 25, 24],
    [29, 30, 31]
  ]);
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[0].getPiece().getValidMoves()).toEqual([]);
  expect(board[7].getPiece().getValidMoves()).toEqual([]);
  expect(board[56].getPiece().getValidMoves()).toEqual([]);
  expect(board[63].getPiece().getValidMoves()).toEqual([]);
});
