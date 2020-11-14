import { Color } from './../constants/colors';
export class Book{
  title: string;
  bookIcon: string;
  color: Color;
  numberOfTexts: number;
}

export const books: Array<Book> = [
  {title: 'Pyramus und Thisbe',
  color: Color.azul,
  numberOfTexts: 3,
  bookIcon: './assets/images/bookImages/pyramus.svg'},
  {title: 'Apollo und Daphne',
  color: Color.purple,
  numberOfTexts: 3,
  bookIcon: './assets/images/bookImages/apollo.svg'}
];
