 import { Component, OnInit, Version, VERSION } from '@angular/core';
 import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/core/logger.service';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/book-tracker-error';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private title: Title
    ) {

  }

  ngOnInit() {

    this.title.setTitle(`Book Tracker ${VERSION.full}`)

    this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllReaders().subscribe(
      (data : Reader[] | BookTrackerError) => this.allReaders = <Reader[]>data,
      (err: BookTrackerError) => this.loggerService.log(err.friendlyMessage),
      () => this.loggerService.log('All done getting readers!')
    );
    this.mostPopularBook = this.dataService.mostPopularBook;

    // handling a response from a promise
    this.dataService.getAuthorRecomondation(1)
      .then(
        (author: string) => {
          this.loggerService.log(author); /* called if promise was resolved */
          // throw new Error('Problem with the success handler!'); // error happend inside a success resolver
        },
        (err: string) => this.loggerService.error(`The promise was rejected: ${err}`) // called if promise was rejected
      )
      .catch(
        (error:Error) => this.loggerService.error(error.message) // catch error happend insid the resolved success function
      );

    this.loggerService.log('Done with dashboard initialization.');

  }

  // Handle a promise using async/await syntax
  private async getAuthorRecomondationAsync(readerID: number): Promise<void> {
    try {
      let author = await this.dataService.getAuthorRecomondation(readerID);
      this.loggerService.log(author);
    }
    catch (error: any) {
      this.loggerService.error(error);
    }
  }


  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
