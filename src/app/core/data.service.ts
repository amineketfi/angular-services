import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private loggerService: LoggerService) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book) {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks():Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find( book => book.bookID === id);
  }

}
