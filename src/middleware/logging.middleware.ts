
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Custom middleware example
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // This middleware has access to the request and response objects
  use(req: Request, res: Response, next: NextFunction) {
    // Example of a logging middleware
    console.log('Request...');
    next();
  }
}

