import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-grid-check-dialog',
  imports: [
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './grid-check-dialog.html',
  styleUrl: './grid-check-dialog.scss'
})
export class GridCheckDialog {
  constructor(@Inject(MAT_DIALOG_DATA) protected _data: { checkStatus: number }) {}
}
