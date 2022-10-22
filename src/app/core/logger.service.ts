import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    const timeString = new Date().toLocaleTimeString();
    console.log(`${message} (${timeString})`);
  }

  error(message: string) {
    console.error(`ERROR: ${message}`);
  }
}
