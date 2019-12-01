import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilService} from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private utilService: UtilService) {
  }

  ngOnInit() {
    this.utilService.spinnerLoading(3500);
  }
}
