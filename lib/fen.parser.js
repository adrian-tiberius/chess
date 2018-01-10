import FenPiece from './fen.map';
import Cell from './cell';
import { WHITE, BLACK } from './constants';

function Fen() {
  const board = [];
  let castlings = {
    [WHITE]: '',
    [BLACK]: ''
  };

  function addPiece(piece) {
    const cell = Cell(board.length, piece);
    board.push(cell);
  }

  function processFenChar(char) {
    if ('12345678'.indexOf(char) !== -1) {
      const piece = FenPiece('');
      for (let i = 0; i < parseInt(char, 10); i += 1) {
        addPiece(piece);
      }
    } else {
      const piece = FenPiece(char, board.length);
      if (char.toLowerCase() === 'k') {
        piece.setCastling(char === 'k' ? castlings[BLACK] : castlings[WHITE]);
      }
      addPiece(piece);
    }
  }

  function processFenRow(rowString) {
    rowString.split('').forEach(char => {
      processFenChar(char);
    });
  }

  function parseCastlings(castling) {
    castlings = {
      [WHITE]: '',
      [BLACK]: ''
    };
    if (castling !== '-') {
      castling.split('').forEach(char => {
        castlings[char.toUpperCase() === char ? WHITE : BLACK] += char;
      });
    }
  }

  function parse(fenString) {
    const [
      fenBoard,
      player,
      castling,
      enPassantSan,
      halfMove,
      numberOfMoves
    ] = fenString.split(' ');

    parseCastlings(castling);
    board.length = 0;
    const rows = fenBoard.split('/');
    for (let row = rows.length - 1; row >= 0; row -= 1) {
      processFenRow(rows[row]);
    }
    return {
      board,
      fenBoard,
      player,
      castling,
      enPassantSan,
      halfMove,
      numberOfMoves
    };
  }

  return { parse };
}

export default Fen();
