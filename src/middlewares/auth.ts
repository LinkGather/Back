import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    res.locals.user = user.id;
    next();
  })(req, res, next);
};

export const authForGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      res.locals.user = 3;
      next();
    }
    res.locals.user = user.id;
    next();
  })(req, res, next);
};
