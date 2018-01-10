import Pawn from '../pawn';
import Chess from '../../index';
import { sortNumber, flatten } from './common';
import { WHITE, BLACK, PieceTypes } from '../../constants';

test('color', () => {
  const pawn = Pawn(WHITE);
  expect(pawn.getColor()).toEqual(WHITE);
});

test('color', () => {
  const pawn = Pawn(BLACK);
  expect(pawn.getColor()).toEqual(BLACK);
});

test('type', () => {
  const pawn = Pawn();
  expect(pawn.getType()).toEqual(PieceTypes.PAWN);
});

test('getMoves(WHITE) from position 8 (left margin)', () => {
  const pawn = Pawn(WHITE, 8);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([16, 24]);
});

test('getMoves(WHITE) from position 9 (no margin)', () => {
  const pawn = Pawn(WHITE, 9);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([17, 25]);
});

test('getMoves(WHITE) from position 15(right margin)', () => {
  const pawn = Pawn(WHITE, 15);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([23, 31]);
});

test('getMoves(WHITE) from position 60(bottom margin)', () => {
  const pawn = Pawn(WHITE, 60);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([]);
});

test('getMoves(BLACK) from position 48 (left margin)', () => {
  const pawn = Pawn(BLACK, 48);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([32, 40]);
});

test('getMoves(BLACK) from position 49 (no margin)', () => {
  const pawn = Pawn(BLACK, 49);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([33, 41]);
});

test('getMoves(BLACK) from position 55(right margin)', () => {
  const pawn = Pawn(BLACK, 55);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([39, 47]);
});

test('getMoves(BLACK) from position 5(top margin)', () => {
  const pawn = Pawn(BLACK, 5);
  expect(flatten(pawn.getMoves()).sort(sortNumber)).toEqual([]);
});

test('getValidMoves for initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[8].getPiece().getValidMoves()).toEqual([16, 24]);
  expect(board[9].getPiece().getValidMoves()).toEqual([17, 25]);
  expect(board[10].getPiece().getValidMoves()).toEqual([18, 26]);
  expect(board[11].getPiece().getValidMoves()).toEqual([19, 27]);
  expect(board[12].getPiece().getValidMoves()).toEqual([20, 28]);
  expect(board[13].getPiece().getValidMoves()).toEqual([21, 29]);
  expect(board[14].getPiece().getValidMoves()).toEqual([22, 30]);
  expect(board[15].getPiece().getValidMoves()).toEqual([23, 31]);

  expect(board[48].getPiece().getValidMoves()).toEqual([40, 32]);
  expect(board[49].getPiece().getValidMoves()).toEqual([41, 33]);
  expect(board[50].getPiece().getValidMoves()).toEqual([42, 34]);
  expect(board[51].getPiece().getValidMoves()).toEqual([43, 35]);
  expect(board[52].getPiece().getValidMoves()).toEqual([44, 36]);
  expect(board[53].getPiece().getValidMoves()).toEqual([45, 37]);
  expect(board[54].getPiece().getValidMoves()).toEqual([46, 38]);
  expect(board[55].getPiece().getValidMoves()).toEqual([47, 39]);
});

test('en passant', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/5P2/8/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(52, 36)).toBe(true);
  expect(chess.isEnPassant()).toBe(true);
  let board = chess.getBoard();
  expect(board[44].isEnPassant).toBe(true);

  expect(board[37].getPiece().getValidMoves()).toEqual([45, 44]);
  expect(chess.move(37, 44)).toBe(true);
  board = chess.getBoard();
  expect(board[36].getPiece().getType()).toBe(PieceTypes.EMPTY);
});
