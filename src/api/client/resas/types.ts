export interface RESASRequestConfig {
  apiKey: string;
  origin: string;
}

export interface RESASResponse<T> {
  message: string | null;
  result: T;
}
