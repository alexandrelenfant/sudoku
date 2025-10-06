export class GridboxModel {
  private readonly _valueInit: boolean = false;

  private _clues: number[] = [];

  constructor(
    private _value?: number|undefined
  ) {
    if (_value !== undefined) {
      this._valueInit = true;
    }
  }

  public getValue(): number|undefined {
    return this._value;
  }

  public setValue(value: number|undefined): void {
    this._value = value;
  }

  public isValueInit(): boolean {
    return this._valueInit;
  }

  public getClues(): number[] {
    return this._clues;
  }

  public switchClue(clue: number): void {
    const index = this._clues.indexOf(clue);
    if (index >= 0) {
      this._clues.splice(index, 1);
    } else {
      this._clues = [...new Set([...this._clues, clue])];
    }
  }
}
