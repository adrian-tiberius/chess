import { WHITE, BLACK } from './constants';
import { Rook, Knight, Bishop, Queen, King, Pawn, Empty } from './pieces';

export default function FenPiece(char, position) {
  const color = char === char.toUpperCase() ? WHITE : BLACK;
  switch (char) {
    case 'q':
    case 'Q':
      return Queen(color, position);
    case 'k':
    case 'K':
      return King(color, position);
    case 'b':
    case 'B':
      return Bishop(color, position);
    case 'n':
    case 'N':
      return Knight(color, position);
    case 'r':
    case 'R':
      return Rook(color, position);
    case 'p':
    case 'P':
      return Pawn(color, position);
    case '':
    default:
      return Empty();
  }
}
