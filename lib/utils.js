export function sanToPosition(algebraicNotation) {
  const parts = algebraicNotation.split('');
  const row = parseInt(parts[1], 10) - 1;
  const column = parts[0].charCodeAt(0) - 'a'.charCodeAt(0);
  return row * 8 + column;
}

export function getPositionsBetween(position1, position2) {
  const positions = [];
  const row1 = Math.floor(position1 / 8);
  const column1 = position1 % 8;
  const row2 = Math.floor(position2 / 8);
  const column2 = position2 % 8;
  const rowDirection = row1 === row2 ? 0 : row1 < row2 ? 1 : -1;
  const columnDirection = column1 === column2 ? 0 : column1 < column2 ? 1 : -1;
  let row = row1 + rowDirection;
  let column = column1 + columnDirection;
  while (
    ((rowDirection >= 0 && row <= row2 - rowDirection) ||
      (rowDirection < 0 && row >= row2 - rowDirection)) &&
    ((columnDirection >= 0 && column <= column2 - columnDirection) ||
      (columnDirection < 0 && column >= column2 - columnDirection))
  ) {
    positions.push(row * 8 + column);
    row += rowDirection;
    column += columnDirection;
  }
  if (row !== row2 || column !== column2) {
    return [];
  }
  return positions;
}

export function getRowColumnFromPosition(position) {
  return {
    row: Math.floor(position / 8),
    column: position % 8
  };
}

export function getDirectionMoves(row, column, rowDirection, columnDirection) {
  const moves = [];
  let indexRow = row + rowDirection;
  let indexColumn = column + columnDirection;
  while (
    ((rowDirection >= 0 && indexRow <= 7) ||
      (rowDirection < 0 && indexRow >= 0)) &&
    ((columnDirection >= 0 && indexColumn <= 7) ||
      (columnDirection < 0 && indexColumn >= 0))
  ) {
    const target = indexRow * 8 + indexColumn;
    moves.push(target);
    indexRow += rowDirection;
    indexColumn += columnDirection;
  }
  return moves;
}

export function getDiagonalMoves(position) {
  const { row, column } = getRowColumnFromPosition(position);

  return [
    getDirectionMoves(row, column, -1, -1),
    getDirectionMoves(row, column, -1, 1),
    getDirectionMoves(row, column, 1, -1),
    getDirectionMoves(row, column, 1, 1)
  ];
}

export function getPerpendicularMoves(position) {
  const { row, column } = getRowColumnFromPosition(position);
  return [
    getDirectionMoves(row, column, -1, 0),
    getDirectionMoves(row, column, 1, 0),
    getDirectionMoves(row, column, 0, -1),
    getDirectionMoves(row, column, 0, 1)
  ];
}
