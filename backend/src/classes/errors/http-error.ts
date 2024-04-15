export type THttpError = {
  message: string;
  error?: { [key: string]: any } | any;
  statusCode?: number;
};

export class HttpError extends Error {
  readonly statusCode: THttpError["statusCode"];
  readonly error: THttpError["error"];

  constructor({ error, message, statusCode = 500 }: THttpError) {
    super(message);
    this.error = error;
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

