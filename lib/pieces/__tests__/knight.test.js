import Knight from '../knight';
import Chess from '../../index';
import { sortNumber } from './common';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const knight = Knight(WHITE);
  expect(knight.getColor()).toEqual(WHITE);
});

test('color', () => {
  const knight = Knight(BLACK);
  expect(knight.getColor()).toEqual(BLACK);
});

test('type', () => {
  const knight = Knight();
  expect(knight.getType()).toEqual(PieceTypes.KNIGHT);
});

test('getMoves from position 0 (top left margin)', () => {
  const knight = Knight(WHITE, 0);
  expect(knight.getMoves().sort(sortNumber)).toEqual([10, 17]);
});

test('getMoves(WHITE) from position 5(top margin)', () => {
  const knight = Knight(WHITE, 5);
  expect(knight.getMoves().sort(sortNumber)).toEqual([11, 15, 20, 22]);
});

test('getMoves from position 7(top right margin)', () => {
  const knight = Knight(WHITE, 7);
  expect(knight.getMoves().sort(sortNumber)).toEqual([13, 22]);
});

test('getMoves from position 23(right margin)', () => {
  const knight = Knight(WHITE, 23);
  expect(knight.getMoves().sort(sortNumber)).toEqual([6, 13, 29, 38]);
});

test('getMoves from position 63(right bottom margin)', () => {
  const knight = Knight(WHITE, 63);
  expect(knight.getMoves().sort(sortNumber)).toEqual([46, 53]);
});

test('getMoves from position 60(bottom margin)', () => {
  const knight = Knight(WHITE, 60);
  expect(knight.getMoves().sort(sortNumber)).toEqual([43, 45, 50, 54]);
});

test('getMoves from position 56 (bottom left margin)', () => {
  const knight = Knight(WHITE, 56);
  expect(knight.getMoves().sort(sortNumber)).toEqual([41, 50]);
});

test('getMoves from position 24 (left margin)', () => {
  const knight = Knight(WHITE, 24);
  expect(knight.getMoves().sort(sortNumber)).toEqual([9, 18, 34, 41]);
});

test('getMoves from position 44 (no margin)', () => {
  const knight = Knight(WHITE, 44);
  expect(knight.getMoves().sort(sortNumber)).toEqual([
    27,
    29,
    34,
    38,
    50,
    54,
    59,
    61
  ]);
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[1].getPiece().getValidMoves()).toEqual([16, 18]);
  expect(board[6].getPiece().getValidMoves()).toEqual([21, 23]);
  expect(board[57].getPiece().getValidMoves()).toEqual([40, 42]);
  expect(board[62].getPiece().getValidMoves()).toEqual([45, 47]);
});
