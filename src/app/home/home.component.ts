import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  clients = ['keels.png', 'oppo.png', 'tvs.png', 'hutch.jpg', 'samsung.png', 'elephant.png', 'mi.png', 'mac.png', 'burger.png'];
  async ngOnInit() {
  }

}
