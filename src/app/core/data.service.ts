import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { BookTrackerError } from 'app/models/book-tracker-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private loggerService: LoggerService,
    private http: HttpClient
    ) { }

  mostPopularBook: Book = allBooks[0];

  // using Promise fpor async business logic
  getAuthorRecomondation(readerID: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // using setTimeOut to simulate a long running test
        if (readerID > 0) resolve('Dr. Seuss');
        else reject('Invalid reader ID');
      }, 2000);
    })
  }

  setMostPopularBook(popularBook: Book) {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers').pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retrieving data.';
    return throwError(dataError);
  }

}
