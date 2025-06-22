export interface IContextRes<T> {
  status: string;
  code: number;
  message: string;
  data: null | T;
}
