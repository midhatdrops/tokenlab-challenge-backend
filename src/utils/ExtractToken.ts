import { Request } from 'express';

export function extractToken(req: Request) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  return token;
}
