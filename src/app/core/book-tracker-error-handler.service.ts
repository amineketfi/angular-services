import { Injectable, ErrorHandler } from '@angular/core';
import { BookTrackerError } from 'app/models/book-tracker-error';

@Injectable()
export class BookTrackerErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    let customError: BookTrackerError = new BookTrackerError();
    customError.errorNumber = 300;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occured. Please try again.';

    console.log(customError);
  }
}
