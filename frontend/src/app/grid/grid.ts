import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatFabButton} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatList, MatListItem} from '@angular/material/list';
import {GridRequestService} from '../services/grid-request.service';
import {GridboxModel} from '../models/gridbox.model';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Gridbox} from '../gridbox/gridbox';
import {AsyncPipe} from '@angular/common';
import {GridService} from '../services/grid.service';
import {Observable} from 'rxjs';
import {GridModel} from '../models/grid.model';

const ERASER_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
    <path d="M210.5 480
    L333.5 480
    L398.8 414.7
    L225.3 241.2
    L98.6 367.9
    L210.6 479.9z
    M256 544
    L210.5 544
    C193.5 544 177.2 537.3 165.2 525.3
    L49 409
    C38.1 398.1 32 383.4 32 368
    C32 352.6 38.1 337.9 49 327
    L295 81
    C305.9 70.1 320.6 64 336 64
    C351.4 64 366.1 70.1 377 81
    L559 263
    C569.9 273.9 576 288.6 576 304
    C576 319.4 569.9 334.1 559 345
    L424 480
    L544 480
    C561.7 480 576 494.3 576 512
    C576 529.7 561.7 544 544 544
    L256 544z"
    />
  </svg>
`;

@Component({
  selector: 'app-grid',
  imports: [MatFabButton, MatGridListModule, MatIconModule, MatList, MatListItem, MatProgressBar, Gridbox, AsyncPipe],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grid implements OnInit {
  protected _selectedGridboxId?: number;

  public constructor(
    protected gridRequestService: GridRequestService
  ) {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('eraser', sanitizer.bypassSecurityTrustHtml(ERASER_ICON));
  }

  public ngOnInit(): void {
    this.gridRequestService.getCurrentGrid$().subscribe((grid) => {
      if (grid) {
        GridService.getInstance().resetGridboxes();
        for (let i = 0; i < 81; ++i) {
          GridService.getInstance().addGridbox(new GridboxModel(0 != grid.data[i] ? grid.data[i] : undefined));
        }
        GridModel.getInstance().setDisplayStatus(GridModel.LOADED_STATUS);
      }
    });
  }

  protected getDisplayStatus$(): Observable<number> {
    return GridModel.getInstance().getDisplayStatus$();
  }

  protected getGridboxes() {
    return GridService.getInstance().getGridboxes();
  }

  protected onGridboxClick(e: MouseEvent, i: number): void {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as Element;
    const el = target.closest("mat-grid-tile.gridbox");
    const children = el?.parentNode?.children;
    if (children) {
      for(let item of children) {
        item.classList.remove("gridbox_selected");
      }
    }
    if (!el?.classList.contains("gridbox_initial")) {
      el?.classList.add("gridbox_selected");
      this._selectedGridboxId = i;
    } else {
      this._selectedGridboxId = undefined;
    }
  }

  protected onValueLeftClick(e: MouseEvent, value: number): void {
    e.preventDefault();
    e.stopPropagation();
    if (undefined !== this._selectedGridboxId) {
      GridService.getInstance().setValueGridbox(this._selectedGridboxId, value);
    }
  }

  protected onValueRightClick(e: MouseEvent, value: number): void {
    e.preventDefault();
    e.stopPropagation();
    if (undefined !== this._selectedGridboxId) {
      GridService.getInstance().switchClueGridbox(this._selectedGridboxId, value);
    }
  }

  protected onEraseClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (undefined !== this._selectedGridboxId) {
      GridService.getInstance().setValueGridbox(this._selectedGridboxId, undefined);
    }
  }

  protected onCapturedClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as Element;
    target.querySelectorAll("#gridboxes mat-grid-tile.gridbox_selected").forEach((item) => {
      item.classList.remove("gridbox_selected");
    });
    this._selectedGridboxId = undefined;
  }
}
