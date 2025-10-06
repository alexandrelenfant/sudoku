import {BehaviorSubject, Observable} from 'rxjs';

export class GridModel {
  public static readonly ERROR_STATUS = -1;

  public static readonly LOADING_STATUS = 0;

  public static readonly LOADED_STATUS = 1;

  private _displayStatus$: BehaviorSubject<number> = new BehaviorSubject(GridModel.LOADING_STATUS);

  private static _instance: GridModel;

  public static getInstance(): GridModel {
    if (!GridModel._instance) {
      GridModel._instance = new GridModel();
    }
    return GridModel._instance;
  }

  private constructor() {}

  public getDisplayStatus$(): Observable<number> {
    return this._displayStatus$.asObservable();
  }

  public setDisplayStatus(displayStatus: number): void {
    this._displayStatus$.next(displayStatus);
  }
}
