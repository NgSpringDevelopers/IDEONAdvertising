import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private spinner: NgxSpinnerService) {}
  spinnerLoading(ms) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, ms);
  }
}
