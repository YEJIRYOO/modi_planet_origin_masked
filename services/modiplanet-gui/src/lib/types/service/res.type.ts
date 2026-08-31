export interface ResultModel<T> {
  data: T | ErrorModel;
  now: number;
}

export interface ErrorModel {
  message: string;
}
