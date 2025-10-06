import { Component } from '@angular/core';
import {Menu} from './menu/menu';
import {Grid} from './grid/grid';
import {GridRequestService} from './services/grid-request.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Grid, Menu, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(
    protected _gridRequestService: GridRequestService
  ) {}
}
