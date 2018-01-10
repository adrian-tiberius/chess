import { PieceTypes } from '../constants';

export default function Piece(type, color) {
  let moves = [];
  let validMoves = [];
  let attacks = [];
  let validAttacks = [];

  function getColor() {
    return color;
  }

  function getType() {
    return type;
  }

  function getMoves() {
    return moves;
  }

  function setMoves(newMoves) {
    moves = newMoves;
  }

  function getValidMoves() {
    return validMoves;
  }

  function getAttacks() {
    return attacks;
  }

  function setAttacks(newAttacks) {
    attacks = newAttacks;
  }

  function getValidAttacks() {
    return validAttacks;
  }

  function validateBoard(board, validateMovesFunc, validateAttacksFunc) {
    if (!validateMovesFunc) {
      validateMovesFunc = validateMoves;
    }
    if (!validateAttacksFunc) {
      validateAttacksFunc = validateAttacks;
    }
    validMoves = validateMovesFunc(moves, board, validateMove);
    validAttacks = validateAttacksFunc(attacks, board, validateAttack);
  }

  function validateMoves(positions, board) {
    return validate(positions, board, validateMove);
  }

  function validateAttacks(positions, board) {
    return validate(positions, board, validateAttack);
  }

  function validate(positions, board, validateFunction) {
    return positions.reduce((result, position) => {
      if (Array.isArray(position)) {
        let index = 0;
        let gotPiece = false;
        while (index < position.length && !gotPiece) {
          const piece = board[position[index]].getPiece();
          if (piece.getType() !== PieceTypes.EMPTY) {
            gotPiece = true;
          }
          if (validateFunction(position[index], board)) {
            result.push(position[index]);
          }
          index += 1;
        }
      } else if (validateFunction(position, board)) {
        result.push(position);
      }
      return result;
    }, []);
  }

  function validateMove(position, board) {
    if (!isValidPosition(position)) {
      return false;
    }
    const piece = board[position].getPiece();
    if (piece.getColor() === color) {
      return false;
    }
    if (
      piece.getType() !== PieceTypes.EMPTY &&
      attacks.indexOf(position) === -1
    ) {
      return false;
    }
    return true;
  }

  function validateAttack(position) {
    return isValidPosition(position);
  }

  function isValidPosition(position) {
    return position >= 0 || position <= 63;
  }

  return {
    getColor,
    getType,
    getMoves,
    setMoves,
    getValidMoves,
    getAttacks,
    setAttacks,
    getValidAttacks,
    validateBoard,
    validateMoves,
    isValidPosition
  };
}
