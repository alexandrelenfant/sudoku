import {GridboxModel} from '../models/gridbox.model';

export class GridService {
  private _gridboxes: GridboxModel[] = [];

  private _currentGridId: number|undefined;

  private static instance: GridService;

  public static getInstance(): GridService {
    if (!GridService.instance) {
      GridService.instance = new GridService();
    }
    return GridService.instance;
  }

  private constructor() {}

  public getCurrentGridId(): number|undefined {
    return this._currentGridId;
  }

  public setCurrentGridId(id: number): void {
    this._currentGridId = id;
  }

  public resetGridboxes() {
    this._gridboxes = [];
  }

  public addGridbox(gridbox: GridboxModel) {
    this._gridboxes.push(gridbox);
  }

  public getGridboxes(): GridboxModel[] {
    return this._gridboxes;
  }

  public setValueGridbox(index: number, value: number|undefined) {
    this._gridboxes[index].setValue(value);
  }

  public switchClueGridbox(index: number, value: number) {
    this._gridboxes[index].switchClue(value);
  }
}
