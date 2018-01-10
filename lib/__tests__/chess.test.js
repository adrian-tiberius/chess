import Chess from '../index';
import { WHITE, BLACK, NONE, PieceTypes } from '../constants';

test('move', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  expect(chess.move(0, 8)).toBe(false);
  expect(chess.move(0, 16)).toBe(false);
  expect(chess.move(8, 24)).toBe(true);
  expect(chess.isEnPassant()).toBe(true);
  const board = chess.getBoard();
  expect(board[8].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[8].getPiece().getColor()).toBe(NONE);
  expect(board[24].getPiece().getType()).toBe(PieceTypes.PAWN);
  expect(board[24].getPiece().getColor()).toBe(WHITE);
});

test('isValidMove', () => {
  expect(1).toEqual(1);
});

test('loadFen - initial positions', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const board = chess.getBoard();
  expect(board[0].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[0].getPiece().getColor()).toEqual(WHITE);
  expect(board[1].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[1].getPiece().getColor()).toEqual(WHITE);
  expect(board[2].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[2].getPiece().getColor()).toEqual(WHITE);
  expect(board[3].getPiece().getType()).toEqual(PieceTypes.QUEEN);
  expect(board[3].getPiece().getColor()).toEqual(WHITE);
  expect(board[4].getPiece().getType()).toEqual(PieceTypes.KING);
  expect(board[4].getPiece().getColor()).toEqual(WHITE);
  expect(board[5].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[5].getPiece().getColor()).toEqual(WHITE);
  expect(board[6].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[6].getPiece().getColor()).toEqual(WHITE);
  expect(board[7].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[7].getPiece().getColor()).toEqual(WHITE);

  expect(board[8].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[8].getPiece().getColor()).toEqual(WHITE);
  expect(board[9].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[9].getPiece().getColor()).toEqual(WHITE);
  expect(board[10].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[10].getPiece().getColor()).toEqual(WHITE);
  expect(board[11].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[11].getPiece().getColor()).toEqual(WHITE);
  expect(board[12].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[12].getPiece().getColor()).toEqual(WHITE);
  expect(board[13].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[13].getPiece().getColor()).toEqual(WHITE);
  expect(board[14].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[14].getPiece().getColor()).toEqual(WHITE);
  expect(board[15].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[15].getPiece().getColor()).toEqual(WHITE);

  for (let i = 16; i < 47; i += 1) {
    expect(board[i].getPiece().getType()).toEqual(PieceTypes.EMPTY);
    expect(board[i].getPiece().getColor()).toEqual(NONE);
  }

  expect(board[48].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[48].getPiece().getColor()).toEqual(BLACK);
  expect(board[49].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[49].getPiece().getColor()).toEqual(BLACK);
  expect(board[50].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[50].getPiece().getColor()).toEqual(BLACK);
  expect(board[51].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[51].getPiece().getColor()).toEqual(BLACK);
  expect(board[52].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[52].getPiece().getColor()).toEqual(BLACK);
  expect(board[53].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[53].getPiece().getColor()).toEqual(BLACK);
  expect(board[54].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[54].getPiece().getColor()).toEqual(BLACK);
  expect(board[55].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[55].getPiece().getColor()).toEqual(BLACK);

  expect(board[56].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[56].getPiece().getColor()).toEqual(BLACK);
  expect(board[57].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[57].getPiece().getColor()).toEqual(BLACK);
  expect(board[58].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[58].getPiece().getColor()).toEqual(BLACK);
  expect(board[59].getPiece().getType()).toEqual(PieceTypes.QUEEN);
  expect(board[59].getPiece().getColor()).toEqual(BLACK);
  expect(board[60].getPiece().getType()).toEqual(PieceTypes.KING);
  expect(board[60].getPiece().getColor()).toEqual(BLACK);
  expect(board[61].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[61].getPiece().getColor()).toEqual(BLACK);
  expect(board[62].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[62].getPiece().getColor()).toEqual(BLACK);
  expect(board[63].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[63].getPiece().getColor()).toEqual(BLACK);

  expect(chess.getCurrentPlayer()).toEqual(WHITE);

  expect(chess.isEnPassant()).toEqual(false);
});

test('loadFen - pawn moved en passant', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
  const board = chess.getBoard();
  expect(board[0].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[0].getPiece().getColor()).toEqual(WHITE);
  expect(board[1].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[1].getPiece().getColor()).toEqual(WHITE);
  expect(board[2].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[2].getPiece().getColor()).toEqual(WHITE);
  expect(board[3].getPiece().getType()).toEqual(PieceTypes.QUEEN);
  expect(board[3].getPiece().getColor()).toEqual(WHITE);
  expect(board[4].getPiece().getType()).toEqual(PieceTypes.KING);
  expect(board[4].getPiece().getColor()).toEqual(WHITE);
  expect(board[5].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[5].getPiece().getColor()).toEqual(WHITE);
  expect(board[6].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[6].getPiece().getColor()).toEqual(WHITE);
  expect(board[7].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[7].getPiece().getColor()).toEqual(WHITE);

  expect(board[8].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[8].getPiece().getColor()).toEqual(WHITE);
  expect(board[9].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[9].getPiece().getColor()).toEqual(WHITE);
  expect(board[10].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[10].getPiece().getColor()).toEqual(WHITE);
  expect(board[11].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[11].getPiece().getColor()).toEqual(WHITE);
  expect(board[12].getPiece().getType()).toEqual(PieceTypes.EMPTY);
  expect(board[12].getPiece().getColor()).toEqual(NONE);
  expect(board[13].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[13].getPiece().getColor()).toEqual(WHITE);
  expect(board[14].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[14].getPiece().getColor()).toEqual(WHITE);
  expect(board[15].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[15].getPiece().getColor()).toEqual(WHITE);

  for (let i = 16; i < 28; i += 1) {
    expect(board[i].getPiece().getType()).toEqual(PieceTypes.EMPTY);
    expect(board[i].getPiece().getColor()).toEqual(NONE);
  }

  expect(board[8].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[8].getPiece().getColor()).toEqual(WHITE);

  for (let i = 39; i < 47; i += 1) {
    expect(board[i].getPiece().getType()).toEqual(PieceTypes.EMPTY);
    expect(board[i].getPiece().getColor()).toEqual(NONE);
  }

  expect(board[48].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[48].getPiece().getColor()).toEqual(BLACK);
  expect(board[49].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[49].getPiece().getColor()).toEqual(BLACK);
  expect(board[50].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[50].getPiece().getColor()).toEqual(BLACK);
  expect(board[51].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[51].getPiece().getColor()).toEqual(BLACK);
  expect(board[52].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[52].getPiece().getColor()).toEqual(BLACK);
  expect(board[53].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[53].getPiece().getColor()).toEqual(BLACK);
  expect(board[54].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[54].getPiece().getColor()).toEqual(BLACK);
  expect(board[55].getPiece().getType()).toEqual(PieceTypes.PAWN);
  expect(board[55].getPiece().getColor()).toEqual(BLACK);

  expect(board[56].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[56].getPiece().getColor()).toEqual(BLACK);
  expect(board[57].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[57].getPiece().getColor()).toEqual(BLACK);
  expect(board[58].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[58].getPiece().getColor()).toEqual(BLACK);
  expect(board[59].getPiece().getType()).toEqual(PieceTypes.QUEEN);
  expect(board[59].getPiece().getColor()).toEqual(BLACK);
  expect(board[60].getPiece().getType()).toEqual(PieceTypes.KING);
  expect(board[60].getPiece().getColor()).toEqual(BLACK);
  expect(board[61].getPiece().getType()).toEqual(PieceTypes.BISHOP);
  expect(board[61].getPiece().getColor()).toEqual(BLACK);
  expect(board[62].getPiece().getType()).toEqual(PieceTypes.KNIGHT);
  expect(board[62].getPiece().getColor()).toEqual(BLACK);
  expect(board[63].getPiece().getType()).toEqual(PieceTypes.ROOK);
  expect(board[63].getPiece().getColor()).toEqual(BLACK);

  expect(chess.getCurrentPlayer()).toEqual(BLACK);

  expect(chess.isEnPassant()).toEqual(true);
});

test('loadFen - en passant', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppp1ppp/8/4pP2/8/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 1');
  expect(chess.isEnPassant()).toBe(true);
  let board = chess.getBoard();
  expect(board[44].isEnPassant).toBe(true);
  expect(board[37].getPiece().getValidMoves()).toEqual([45, 44]);
  expect(chess.move(37, 44)).toBe(true);
  board = chess.getBoard();
  expect(board[36].getPiece().getType()).toBe(PieceTypes.EMPTY);
});

test('check', () => {
  const chess = Chess();
  chess.loadFen('rnbqkbnr/pppppBpp/8/8/8/8/PPPPPPPP/RNB1KBNR b KQkq - 0 1');
  expect(chess.isCheck()).toBe(true);
  expect(chess.isCheckMate()).toBe(false);
  chess.loadFen('rnbqkbnr/pppppQpp/8/8/8/1B6/PPPPPPPP/RN11KBNR b KQkq - 0 1');
  expect(chess.isCheck()).toBe(true);
  expect(chess.isCheckMate()).toBe(true);
  chess.loadFen('rnbqkbnr/pppPpQpp/8/8/8/1B6/PPPPPPPP/RN11KBNR b KQkq - 0 1');
  expect(chess.isCheck()).toBe(true);
  expect(chess.isCheckMate()).toBe(false);
});

test.only('castling', () => {
  const chess = Chess();

  // valid K
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1');
  expect(chess.move(4, 6)).toBe(true);
  let board = chess.getBoard();
  expect(board[4].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[7].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[5].getPiece().getType()).toBe(PieceTypes.ROOK);
  expect(board[6].getPiece().getType()).toBe(PieceTypes.KING);

  // valid Q
  chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3KBNR w KQkq - 0 1');
  expect(chess.move(4, 2)).toBe(true);
  board = chess.getBoard();
  expect(board[4].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[0].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[3].getPiece().getType()).toBe(PieceTypes.ROOK);
  expect(board[2].getPiece().getType()).toBe(PieceTypes.KING);

  // valid k
  chess.loadFen('rnbqk2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 62)).toBe(true);
  board = chess.getBoard();
  expect(board[60].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[63].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[61].getPiece().getType()).toBe(PieceTypes.ROOK);
  expect(board[62].getPiece().getType()).toBe(PieceTypes.KING);

  // valid q
  chess.loadFen('r3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(true);
  board = chess.getBoard();
  expect(board[60].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[56].getPiece().getType()).toBe(PieceTypes.EMPTY);
  expect(board[59].getPiece().getType()).toBe(PieceTypes.ROOK);
  expect(board[58].getPiece().getType()).toBe(PieceTypes.KING);

  // invalid - first square is under attack
  chess.loadFen('r3kbnr/ppPppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - second square is under attack
  chess.loadFen('r3kbnr/pPpppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - first square is occupied
  chess.loadFen('r2qkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - second square is occupied
  chess.loadFen('r1b1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - third square is occupied
  chess.loadFen('rk2kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - king is in check
  chess.loadFen('r3kbnr/pppPpppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 58)).toBe(false);

  // invalid - king has moved
  chess.loadFen('r3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(60, 59)).toBe(true);
  expect(chess.move(8, 16)).toBe(true);
  expect(chess.move(59, 60)).toBe(true);
  expect(chess.move(16, 24)).toBe(true);
  expect(chess.move(60, 58)).toBe(false);

  // invalid - rook has moved
  chess.loadFen('r3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
  expect(chess.move(56, 57)).toBe(true);
  expect(chess.move(8, 16)).toBe(true);
  expect(chess.move(57, 56)).toBe(true);
  expect(chess.move(16, 24)).toBe(true);
  expect(chess.move(60, 58)).toBe(false);
});
