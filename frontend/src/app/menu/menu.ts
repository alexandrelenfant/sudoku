import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {GridRequestService} from '../services/grid-request.service';
import {GridService} from '../services/grid.service';
import {GridboxModel} from '../models/gridbox.model';
import {GridCheckDialog} from '../grid-check-dialog/grid-check-dialog';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {GridModel} from '../models/grid.model';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, MatButtonModule, MatInputModule, MatRadioModule, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  protected _selectedDifficulty: string = 'random';

  protected _selectedId?: number;

  private _dialog = inject(MatDialog);

  public constructor(
    protected _gridRequestService: GridRequestService
  ) {}

  protected onNewGrid(): void {
    GridModel.getInstance().setDisplayStatus(GridModel.LOADING_STATUS);
    this._gridRequestService.askNewGrid(this._selectedDifficulty, this._selectedId);
  }

  protected onReloadGrid(): void {
    GridModel.getInstance().setDisplayStatus(GridModel.LOADING_STATUS);
    this._gridRequestService.reloadCurrentGrid();
  }

  protected onCheckGrid(): void {
    const gridboxes: GridboxModel[] = GridService.getInstance().getGridboxes();
    let data: number[] = [];
    for(let i = 0; i < gridboxes.length; ++i) {
      let value = gridboxes[i].getValue();
      if(undefined === value) {
        this._dialog.open(GridCheckDialog, {data: {checkStatus: -1}});
        return;
      }
      data.push(value);
    }
    this._gridRequestService.checkGrid(GridService.getInstance().getCurrentGridId()!, data);
  }
}
