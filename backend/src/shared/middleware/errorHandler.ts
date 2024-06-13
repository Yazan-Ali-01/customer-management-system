import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('Error caught by handler:', err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
