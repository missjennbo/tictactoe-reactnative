export interface CellInfo {
  filledWith: Marker;
  row: number;
  cell: number;
}

export enum Marker {
  heart,
  cross,
  unmarked
}