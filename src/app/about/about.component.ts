import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private utilService: UtilService) {}
  ngOnInit() {
    this.utilService.spinnerLoading(1000);
  }

}
