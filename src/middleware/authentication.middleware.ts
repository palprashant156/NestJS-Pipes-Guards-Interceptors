
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Authentication Middleware...');
    const token = req.headers['authorization'];

    if (token === 'my-secret-token') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}

