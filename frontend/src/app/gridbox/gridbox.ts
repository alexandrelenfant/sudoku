import {Component, input} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-gridbox',
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './gridbox.html',
  styleUrl: './gridbox.scss'
})
export class Gridbox {
  public value = input<number>();
  public valueInit = input<boolean>();
  public clues = input<number[]>();
}
