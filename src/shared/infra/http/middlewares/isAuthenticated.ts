import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import ITokenPayload from '../interface/ITokenPayload';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = authConfig.jwt.secret;

    if (!secret) {
      throw new AppError('JWT secret is missing.');
    }

    const decodedToken = verify(token, secret) as ITokenPayload;

    const { sub } = decodedToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
