export default function getPlayerPosition(position: number) {
  switch (position) {
    case 10:
      return 'G';
    case 20:
      return 'D';
    case 21:
      return 'L';
    case 31:
      return 'MD';
    case 32:
      return 'MO';
    case 40:
      return 'A';
    default:
      return '';
  }
}
