import { NextFunction, Request, Response } from "express";
import { HttpError } from "../classes/errors/http-error";
import { AxiosError } from "axios";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handled errors
  if (err instanceof HttpError) {
    const { statusCode, error, message } = err;

    console.error(message, JSON.stringify(error));
    return res.status(statusCode || 500).send({ message, context: error });
  }

  if (err instanceof AxiosError) {
    const { message, code, response } = err;

    console.error(message, JSON.stringify(response?.data));
    return res.status(Number(code)).send({ message, context: response?.data });
  }

  console.error(JSON.stringify(err));

  return res.status(500).send({ message: "Internal Server Error" });
};

