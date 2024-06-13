import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../../../shared/errors/AuthenticationError';
import { AuthorizationError } from '../../../shared/errors/AuthorizationError';

const jwtSecret = process.env.JWT_SECRET || 'development_secret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        console.log(err);
        throw new AuthorizationError('Unauthenticated, Please login and try again.');
      }
      req.user = user;
      next();
    });
  } else {
    throw new AuthenticationError('Unauthenticated, Please login and try again.');
  }
};
