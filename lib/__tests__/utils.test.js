import {
  getPositionsBetween,
  sanToPosition,
  getRowColumnFromPosition,
  getDirectionMoves,
  getDiagonalMoves,
  getPerpendicularMoves
} from '../utils';

test('getPositionsBetween', () => {
  expect(getPositionsBetween(0, 63)).toEqual([9, 18, 27, 36, 45, 54]);
  expect(getPositionsBetween(63, 0)).toEqual([54, 45, 36, 27, 18, 9]);

  expect(getPositionsBetween(7, 56)).toEqual([14, 21, 28, 35, 42, 49]);
  expect(getPositionsBetween(56, 7)).toEqual([49, 42, 35, 28, 21, 14]);

  expect(getPositionsBetween(0, 7)).toEqual([1, 2, 3, 4, 5, 6]);
  expect(getPositionsBetween(7, 0)).toEqual([6, 5, 4, 3, 2, 1]);

  expect(getPositionsBetween(0, 56)).toEqual([8, 16, 24, 32, 40, 48]);
  expect(getPositionsBetween(56, 0)).toEqual([48, 40, 32, 24, 16, 8]);

  expect(getPositionsBetween(0, 8)).toEqual([]);
  expect(getPositionsBetween(8, 0)).toEqual([]);

  expect(getPositionsBetween(0, 9)).toEqual([]);
  expect(getPositionsBetween(9, 0)).toEqual([]);
});

test('sanToPosition', () => {
  expect(sanToPosition('a1')).toEqual(0);
  expect(sanToPosition('a2')).toEqual(8);
  expect(sanToPosition('a3')).toEqual(16);
  expect(sanToPosition('a4')).toEqual(24);
  expect(sanToPosition('a5')).toEqual(32);
  expect(sanToPosition('a6')).toEqual(40);
  expect(sanToPosition('a7')).toEqual(48);
  expect(sanToPosition('a8')).toEqual(56);

  expect(sanToPosition('b1')).toEqual(1);
  expect(sanToPosition('b2')).toEqual(9);
  expect(sanToPosition('b3')).toEqual(17);
  expect(sanToPosition('b4')).toEqual(25);
  expect(sanToPosition('b5')).toEqual(33);
  expect(sanToPosition('b6')).toEqual(41);
  expect(sanToPosition('b7')).toEqual(49);
  expect(sanToPosition('b8')).toEqual(57);

  expect(sanToPosition('c1')).toEqual(2);
  expect(sanToPosition('c2')).toEqual(10);
  expect(sanToPosition('c3')).toEqual(18);
  expect(sanToPosition('c4')).toEqual(26);
  expect(sanToPosition('c5')).toEqual(34);
  expect(sanToPosition('c6')).toEqual(42);
  expect(sanToPosition('c7')).toEqual(50);
  expect(sanToPosition('c8')).toEqual(58);

  expect(sanToPosition('d1')).toEqual(3);
  expect(sanToPosition('d2')).toEqual(11);
  expect(sanToPosition('d3')).toEqual(19);
  expect(sanToPosition('d4')).toEqual(27);
  expect(sanToPosition('d5')).toEqual(35);
  expect(sanToPosition('d6')).toEqual(43);
  expect(sanToPosition('d7')).toEqual(51);
  expect(sanToPosition('d8')).toEqual(59);

  expect(sanToPosition('e1')).toEqual(4);
  expect(sanToPosition('e2')).toEqual(12);
  expect(sanToPosition('e3')).toEqual(20);
  expect(sanToPosition('e4')).toEqual(28);
  expect(sanToPosition('e5')).toEqual(36);
  expect(sanToPosition('e6')).toEqual(44);
  expect(sanToPosition('e7')).toEqual(52);
  expect(sanToPosition('e8')).toEqual(60);

  expect(sanToPosition('f1')).toEqual(5);
  expect(sanToPosition('f2')).toEqual(13);
  expect(sanToPosition('f3')).toEqual(21);
  expect(sanToPosition('f4')).toEqual(29);
  expect(sanToPosition('f5')).toEqual(37);
  expect(sanToPosition('f6')).toEqual(45);
  expect(sanToPosition('f7')).toEqual(53);
  expect(sanToPosition('f8')).toEqual(61);

  expect(sanToPosition('g1')).toEqual(6);
  expect(sanToPosition('g2')).toEqual(14);
  expect(sanToPosition('g3')).toEqual(22);
  expect(sanToPosition('g4')).toEqual(30);
  expect(sanToPosition('g5')).toEqual(38);
  expect(sanToPosition('g6')).toEqual(46);
  expect(sanToPosition('g7')).toEqual(54);
  expect(sanToPosition('g8')).toEqual(62);

  expect(sanToPosition('h1')).toEqual(7);
  expect(sanToPosition('h2')).toEqual(15);
  expect(sanToPosition('h3')).toEqual(23);
  expect(sanToPosition('h4')).toEqual(31);
  expect(sanToPosition('h5')).toEqual(39);
  expect(sanToPosition('h6')).toEqual(47);
  expect(sanToPosition('h7')).toEqual(55);
  expect(sanToPosition('h8')).toEqual(63);
});

test('getRowColumnFromPosition', () => {
  expect(getRowColumnFromPosition(0)).toEqual({ row: 0, column: 0 });
  expect(getRowColumnFromPosition(1)).toEqual({ row: 0, column: 1 });
  expect(getRowColumnFromPosition(2)).toEqual({ row: 0, column: 2 });
  expect(getRowColumnFromPosition(3)).toEqual({ row: 0, column: 3 });
  expect(getRowColumnFromPosition(4)).toEqual({ row: 0, column: 4 });
  expect(getRowColumnFromPosition(5)).toEqual({ row: 0, column: 5 });
  expect(getRowColumnFromPosition(6)).toEqual({ row: 0, column: 6 });
  expect(getRowColumnFromPosition(7)).toEqual({ row: 0, column: 7 });

  expect(getRowColumnFromPosition(8)).toEqual({ row: 1, column: 0 });
  expect(getRowColumnFromPosition(9)).toEqual({ row: 1, column: 1 });
  expect(getRowColumnFromPosition(10)).toEqual({ row: 1, column: 2 });
  expect(getRowColumnFromPosition(11)).toEqual({ row: 1, column: 3 });
  expect(getRowColumnFromPosition(12)).toEqual({ row: 1, column: 4 });
  expect(getRowColumnFromPosition(13)).toEqual({ row: 1, column: 5 });
  expect(getRowColumnFromPosition(14)).toEqual({ row: 1, column: 6 });
  expect(getRowColumnFromPosition(15)).toEqual({ row: 1, column: 7 });

  expect(getRowColumnFromPosition(16)).toEqual({ row: 2, column: 0 });
  expect(getRowColumnFromPosition(17)).toEqual({ row: 2, column: 1 });
  expect(getRowColumnFromPosition(18)).toEqual({ row: 2, column: 2 });
  expect(getRowColumnFromPosition(19)).toEqual({ row: 2, column: 3 });
  expect(getRowColumnFromPosition(20)).toEqual({ row: 2, column: 4 });
  expect(getRowColumnFromPosition(21)).toEqual({ row: 2, column: 5 });
  expect(getRowColumnFromPosition(22)).toEqual({ row: 2, column: 6 });
  expect(getRowColumnFromPosition(23)).toEqual({ row: 2, column: 7 });

  expect(getRowColumnFromPosition(24)).toEqual({ row: 3, column: 0 });
  expect(getRowColumnFromPosition(25)).toEqual({ row: 3, column: 1 });
  expect(getRowColumnFromPosition(26)).toEqual({ row: 3, column: 2 });
  expect(getRowColumnFromPosition(27)).toEqual({ row: 3, column: 3 });
  expect(getRowColumnFromPosition(28)).toEqual({ row: 3, column: 4 });
  expect(getRowColumnFromPosition(29)).toEqual({ row: 3, column: 5 });
  expect(getRowColumnFromPosition(30)).toEqual({ row: 3, column: 6 });
  expect(getRowColumnFromPosition(31)).toEqual({ row: 3, column: 7 });

  expect(getRowColumnFromPosition(32)).toEqual({ row: 4, column: 0 });
  expect(getRowColumnFromPosition(33)).toEqual({ row: 4, column: 1 });
  expect(getRowColumnFromPosition(34)).toEqual({ row: 4, column: 2 });
  expect(getRowColumnFromPosition(35)).toEqual({ row: 4, column: 3 });
  expect(getRowColumnFromPosition(36)).toEqual({ row: 4, column: 4 });
  expect(getRowColumnFromPosition(37)).toEqual({ row: 4, column: 5 });
  expect(getRowColumnFromPosition(38)).toEqual({ row: 4, column: 6 });
  expect(getRowColumnFromPosition(39)).toEqual({ row: 4, column: 7 });

  expect(getRowColumnFromPosition(40)).toEqual({ row: 5, column: 0 });
  expect(getRowColumnFromPosition(41)).toEqual({ row: 5, column: 1 });
  expect(getRowColumnFromPosition(42)).toEqual({ row: 5, column: 2 });
  expect(getRowColumnFromPosition(43)).toEqual({ row: 5, column: 3 });
  expect(getRowColumnFromPosition(44)).toEqual({ row: 5, column: 4 });
  expect(getRowColumnFromPosition(45)).toEqual({ row: 5, column: 5 });
  expect(getRowColumnFromPosition(46)).toEqual({ row: 5, column: 6 });
  expect(getRowColumnFromPosition(47)).toEqual({ row: 5, column: 7 });

  expect(getRowColumnFromPosition(48)).toEqual({ row: 6, column: 0 });
  expect(getRowColumnFromPosition(49)).toEqual({ row: 6, column: 1 });
  expect(getRowColumnFromPosition(50)).toEqual({ row: 6, column: 2 });
  expect(getRowColumnFromPosition(51)).toEqual({ row: 6, column: 3 });
  expect(getRowColumnFromPosition(52)).toEqual({ row: 6, column: 4 });
  expect(getRowColumnFromPosition(53)).toEqual({ row: 6, column: 5 });
  expect(getRowColumnFromPosition(54)).toEqual({ row: 6, column: 6 });
  expect(getRowColumnFromPosition(55)).toEqual({ row: 6, column: 7 });

  expect(getRowColumnFromPosition(56)).toEqual({ row: 7, column: 0 });
  expect(getRowColumnFromPosition(57)).toEqual({ row: 7, column: 1 });
  expect(getRowColumnFromPosition(58)).toEqual({ row: 7, column: 2 });
  expect(getRowColumnFromPosition(59)).toEqual({ row: 7, column: 3 });
  expect(getRowColumnFromPosition(60)).toEqual({ row: 7, column: 4 });
  expect(getRowColumnFromPosition(61)).toEqual({ row: 7, column: 5 });
  expect(getRowColumnFromPosition(62)).toEqual({ row: 7, column: 6 });
  expect(getRowColumnFromPosition(63)).toEqual({ row: 7, column: 7 });
});

test('getDirectionMoves', () => {
  // top left corner - 0
  expect(getDirectionMoves(0, 0, 1, 1)).toEqual([9, 18, 27, 36, 45, 54, 63]);
  expect(getDirectionMoves(0, 0, 0, 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  expect(getDirectionMoves(0, 0, 1, 0)).toEqual([8, 16, 24, 32, 40, 48, 56]);
  expect(getDirectionMoves(0, 0, -1, 0)).toEqual([]);
  expect(getDirectionMoves(0, 0, 0, -1)).toEqual([]);
  expect(getDirectionMoves(0, 0, -1, -1)).toEqual([]);
  expect(getDirectionMoves(0, 0, -1, 1)).toEqual([]);
  expect(getDirectionMoves(0, 0, 1, -1)).toEqual([]);

  // top margin - 3
  expect(getDirectionMoves(0, 3, 1, 1)).toEqual([12, 21, 30, 39]);
  expect(getDirectionMoves(0, 3, 0, 1)).toEqual([4, 5, 6, 7]);
  expect(getDirectionMoves(0, 3, 1, 0)).toEqual([11, 19, 27, 35, 43, 51, 59]);
  expect(getDirectionMoves(0, 3, -1, 0)).toEqual([]);
  expect(getDirectionMoves(0, 3, 0, -1)).toEqual([2, 1, 0]);
  expect(getDirectionMoves(0, 3, -1, -1)).toEqual([]);
  expect(getDirectionMoves(0, 3, -1, 1)).toEqual([]);
  expect(getDirectionMoves(0, 3, 1, -1)).toEqual([10, 17, 24]);

  // top right corner - 7
  expect(getDirectionMoves(0, 7, 1, 1)).toEqual([]);
  expect(getDirectionMoves(0, 7, 0, 1)).toEqual([]);
  expect(getDirectionMoves(0, 7, 1, 0)).toEqual([15, 23, 31, 39, 47, 55, 63]);
  expect(getDirectionMoves(0, 7, -1, 0)).toEqual([]);
  expect(getDirectionMoves(0, 7, 0, -1)).toEqual([6, 5, 4, 3, 2, 1, 0]);
  expect(getDirectionMoves(0, 7, -1, -1)).toEqual([]);
  expect(getDirectionMoves(0, 7, -1, 1)).toEqual([]);
  expect(getDirectionMoves(0, 7, 1, -1)).toEqual([14, 21, 28, 35, 42, 49, 56]);

  // right margin - 31
  expect(getDirectionMoves(3, 7, 1, 1)).toEqual([]);
  expect(getDirectionMoves(3, 7, 0, 1)).toEqual([]);
  expect(getDirectionMoves(3, 7, 1, 0)).toEqual([39, 47, 55, 63]);
  expect(getDirectionMoves(3, 7, -1, 0)).toEqual([23, 15, 7]);
  expect(getDirectionMoves(3, 7, 0, -1)).toEqual([30, 29, 28, 27, 26, 25, 24]);
  expect(getDirectionMoves(3, 7, -1, -1)).toEqual([22, 13, 4]);
  expect(getDirectionMoves(3, 7, -1, 1)).toEqual([]);
  expect(getDirectionMoves(3, 7, 1, -1)).toEqual([38, 45, 52, 59]);

  // bottom right corner - 63
  expect(getDirectionMoves(7, 7, 1, 1)).toEqual([]);
  expect(getDirectionMoves(7, 7, 0, 1)).toEqual([]);
  expect(getDirectionMoves(7, 7, 1, 0)).toEqual([]);
  expect(getDirectionMoves(7, 7, -1, 0)).toEqual([55, 47, 39, 31, 23, 15, 7]);
  expect(getDirectionMoves(7, 7, 0, -1)).toEqual([62, 61, 60, 59, 58, 57, 56]);
  expect(getDirectionMoves(7, 7, -1, -1)).toEqual([54, 45, 36, 27, 18, 9, 0]);
  expect(getDirectionMoves(7, 7, -1, 1)).toEqual([]);
  expect(getDirectionMoves(7, 7, 1, -1)).toEqual([]);

  // bottom margin - 60
  expect(getDirectionMoves(7, 4, 1, 1)).toEqual([]);
  expect(getDirectionMoves(7, 4, 0, 1)).toEqual([61, 62, 63]);
  expect(getDirectionMoves(7, 4, 1, 0)).toEqual([]);
  expect(getDirectionMoves(7, 4, -1, 0)).toEqual([52, 44, 36, 28, 20, 12, 4]);
  expect(getDirectionMoves(7, 4, 0, -1)).toEqual([59, 58, 57, 56]);
  expect(getDirectionMoves(7, 4, -1, -1)).toEqual([51, 42, 33, 24]);
  expect(getDirectionMoves(7, 4, -1, 1)).toEqual([53, 46, 39]);
  expect(getDirectionMoves(7, 4, 1, -1)).toEqual([]);

  // bottom left corner - 56
  expect(getDirectionMoves(7, 0, 1, 1)).toEqual([]);
  expect(getDirectionMoves(7, 0, 0, 1)).toEqual([57, 58, 59, 60, 61, 62, 63]);
  expect(getDirectionMoves(7, 0, 1, 0)).toEqual([]);
  expect(getDirectionMoves(7, 0, -1, 0)).toEqual([48, 40, 32, 24, 16, 8, 0]);
  expect(getDirectionMoves(7, 0, 0, -1)).toEqual([]);
  expect(getDirectionMoves(7, 0, -1, -1)).toEqual([]);
  expect(getDirectionMoves(7, 0, -1, 1)).toEqual([49, 42, 35, 28, 21, 14, 7]);
  expect(getDirectionMoves(7, 0, 1, -1)).toEqual([]);

  // left margin - 40
  expect(getDirectionMoves(5, 0, 1, 1)).toEqual([49, 58]);
  expect(getDirectionMoves(5, 0, 0, 1)).toEqual([41, 42, 43, 44, 45, 46, 47]);
  expect(getDirectionMoves(5, 0, 1, 0)).toEqual([48, 56]);
  expect(getDirectionMoves(5, 0, -1, 0)).toEqual([32, 24, 16, 8, 0]);
  expect(getDirectionMoves(5, 0, 0, -1)).toEqual([]);
  expect(getDirectionMoves(5, 0, -1, -1)).toEqual([]);
  expect(getDirectionMoves(5, 0, -1, 1)).toEqual([33, 26, 19, 12, 5]);
  expect(getDirectionMoves(5, 0, 1, -1)).toEqual([]);

  // middle
  expect(getDirectionMoves(3, 4, 1, 1)).toEqual([37, 46, 55]);
  expect(getDirectionMoves(3, 4, 0, 1)).toEqual([29, 30, 31]);
  expect(getDirectionMoves(3, 4, 1, 0)).toEqual([36, 44, 52, 60]);
  expect(getDirectionMoves(3, 4, -1, 0)).toEqual([20, 12, 4]);
  expect(getDirectionMoves(3, 4, 0, -1)).toEqual([27, 26, 25, 24]);
  expect(getDirectionMoves(3, 4, -1, -1)).toEqual([19, 10, 1]);
  expect(getDirectionMoves(3, 4, -1, 1)).toEqual([21, 14, 7]);
  expect(getDirectionMoves(3, 4, 1, -1)).toEqual([35, 42, 49, 56]);
});

test('getDiagonalMoves', () => {
  // top left corner
  expect(getDiagonalMoves(0)).toEqual([
    [], // top left
    [], // top right
    [], // down left
    [9, 18, 27, 36, 45, 54, 63] // down right
  ]);

  // top margin
  expect(getDiagonalMoves(3)).toEqual([[], [], [10, 17, 24], [12, 21, 30, 39]]);

  // top right corner
  expect(getDiagonalMoves(7)).toEqual([
    [],
    [],
    [14, 21, 28, 35, 42, 49, 56],
    []
  ]);

  // right margin
  expect(getDiagonalMoves(39)).toEqual([[30, 21, 12, 3], [], [46, 53, 60], []]);

  // bottom right corner
  expect(getDiagonalMoves(63)).toEqual([
    [54, 45, 36, 27, 18, 9, 0],
    [],
    [],
    []
  ]);

  // bottom margin
  expect(getDiagonalMoves(60)).toEqual([
    [51, 42, 33, 24],
    [53, 46, 39],
    [],
    []
  ]);

  // bottom left corner
  expect(getDiagonalMoves(56)).toEqual([
    [],
    [49, 42, 35, 28, 21, 14, 7],
    [],
    []
  ]);

  // left margin
  expect(getDiagonalMoves(40)).toEqual([[], [33, 26, 19, 12, 5], [], [49, 58]]);

  // middle
  expect(getDiagonalMoves(28)).toEqual([
    [19, 10, 1],
    [21, 14, 7],
    [35, 42, 49, 56],
    [37, 46, 55]
  ]);
});

test('getPerpendicularMoves', () => {
  // top left corner
  expect(getPerpendicularMoves(0)).toEqual([
    [], // top
    [8, 16, 24, 32, 40, 48, 56], // bottom
    [], // left
    [1, 2, 3, 4, 5, 6, 7] // right
  ]);

  // top margin
  expect(getPerpendicularMoves(3)).toEqual([
    [],
    [11, 19, 27, 35, 43, 51, 59],
    [2, 1, 0],
    [4, 5, 6, 7]
  ]);

  // top right corner
  expect(getPerpendicularMoves(7)).toEqual([
    [],
    [15, 23, 31, 39, 47, 55, 63],
    [6, 5, 4, 3, 2, 1, 0],
    []
  ]);

  // right margin
  expect(getPerpendicularMoves(39)).toEqual([
    [31, 23, 15, 7],
    [47, 55, 63],
    [38, 37, 36, 35, 34, 33, 32],
    []
  ]);

  // bottom right corner
  expect(getPerpendicularMoves(63)).toEqual([
    [55, 47, 39, 31, 23, 15, 7],
    [],
    [62, 61, 60, 59, 58, 57, 56],
    []
  ]);

  // bottom margin
  expect(getPerpendicularMoves(60)).toEqual([
    [52, 44, 36, 28, 20, 12, 4],
    [],
    [59, 58, 57, 56],
    [61, 62, 63]
  ]);

  // bottom left corner
  expect(getPerpendicularMoves(56)).toEqual([
    [48, 40, 32, 24, 16, 8, 0],
    [],
    [],
    [57, 58, 59, 60, 61, 62, 63]
  ]);

  // left margin
  expect(getPerpendicularMoves(40)).toEqual([
    [32, 24, 16, 8, 0],
    [48, 56],
    [],
    [41, 42, 43, 44, 45, 46, 47]
  ]);

  // middle
  expect(getPerpendicularMoves(28)).toEqual([
    [20, 12, 4],
    [36, 44, 52, 60],
    [27, 26, 25, 24],
    [29, 30, 31]
  ]);
});
