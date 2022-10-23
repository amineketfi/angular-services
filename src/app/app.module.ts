import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { HttpClientModule } from '@angular/common/http';
import { BookTrackerErrorHandlerService } from './core/book-tracker-error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  //   // Simple Service provider(Angular default):
  //    { provide: LoggerService, useClass: LoggerService }
  //   // Use Existing Service:(for example you hade a service and you want to change it with a new one)
  //   PlainLoggerService, //(the new one)
  //   { provide: LoggerService, useExisting: PlainLoggerService },
  //   // Replace the service with an object literal
  //   { provide: LoggerService, useValue: {
  //     log: (message: string) => console.log(`MESSAGE: ${message}`),
  //     error :(message: string) => console.error(`ERROR: ${message}`)
  //   }
  //   // Customize the provider with a factory function
  //   { provide:LoggerService, useFactory: dataServiceFactory, deps: [LoggerService] }
  // }
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
