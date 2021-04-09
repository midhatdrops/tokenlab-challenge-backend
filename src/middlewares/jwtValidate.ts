/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function jwtValidate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    jwt.verify(token, process.env.AUTH_SECRET, (err) => {
      if (err) {
        return res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
