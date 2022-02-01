import { Request, Response, NextFunction } from 'express';
import { customError } from '../interfaces/error.interface';

export const errorHandler = async (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
};
