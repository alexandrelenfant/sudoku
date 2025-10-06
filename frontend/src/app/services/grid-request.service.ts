import {inject, Injectable} from '@angular/core';
import {GridDto} from '../dto/grid.dto';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, shareReplay, Subscription} from 'rxjs';
import {GridCheckDialog} from '../grid-check-dialog/grid-check-dialog';
import {GridService} from './grid.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class GridRequestService {
  private _http = inject(HttpClient);

  private _dialog = inject(MatDialog);

  private _httpGetGridSubscription: Subscription|undefined;

  private _httpCheckGridSubscription: Subscription|undefined;

  private _grid$: BehaviorSubject<GridDto|undefined> = new BehaviorSubject<GridDto|undefined>(undefined);

  askNewGrid(difficulty: string = "random", id?: number): void {
    let params = new HttpParams().set('difficulty', difficulty);
    if(undefined != id) {
      params = params.set('id', id);
    }

    if(undefined !== this._httpGetGridSubscription) {
      this._httpGetGridSubscription.unsubscribe();
    }
    this._httpGetGridSubscription = this._http.get<GridDto>(
      'http://localhost:8081', {
        params: params
      }
    )
      .pipe(shareReplay({bufferSize: 1, refCount: true}))
      .subscribe(grid => {
        this._grid$.next(grid);
        GridService.getInstance().setCurrentGridId(grid.id);
      });
  }

  getCurrentGrid$(): BehaviorSubject<GridDto|undefined> {
    return this._grid$;
  }

  reloadCurrentGrid(): void {
    this._grid$.next(this._grid$.getValue());
  }

  public checkGrid(id: number, data: number[]): void {
    if(undefined !== this._httpCheckGridSubscription) {
      this._httpCheckGridSubscription.unsubscribe();
    }
    this._httpCheckGridSubscription = this._http.post<boolean>(`http://localhost:8081/check/${id}`, data)
      .pipe(shareReplay({bufferSize: 1, refCount: true}))
      .subscribe(checkStatus => { this._dialog.open(GridCheckDialog, {data: {checkStatus: checkStatus ? 0 : 1}}); });
  }
}
