import { WHITE, BLACK } from './constants';

export default function Cell(position, piece) {
  const attackedBy = {
    [WHITE]: [],
    [BLACK]: []
  };

  function getPiece() {
    return piece;
  }

  function setPiece(newPiece) {
    piece = newPiece;
  }

  function clearAttacks() {
    attackedBy[WHITE] = [];
    attackedBy[BLACK] = [];
  }

  function addAttack(color, attackerPosition) {
    attackedBy[color].push(attackerPosition);
  }

  function getAttackers(color) {
    return attackedBy[color];
  }

  function isAttacked(color) {
    return attackedBy[color].length > 0;
  }

  function getPosition() {
    return position;
  }

  return {
    getPiece,
    setPiece,
    clearAttacks,
    addAttack,
    getAttackers,
    isAttacked,
    isEnPassant: false,
    getPosition
  };
}
