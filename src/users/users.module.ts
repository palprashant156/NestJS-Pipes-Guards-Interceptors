
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthenticationMiddleware } from '../middleware/authentication.middleware';
import { RequestModificationMiddleware } from '../middleware/request-modification.middleware';
import { LoggingMiddleware } from '../middleware/logging.middleware';
import morgan from 'morgan';

@Module({
  controllers: [UsersController],
})
// Applying middleware at module level
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Applying middleware per route
      .apply(AuthenticationMiddleware)
      .forRoutes('users/profile');

    consumer
      // Middleware execution order: RequestModificationMiddleware -> LoggingMiddleware
      .apply(RequestModificationMiddleware, LoggingMiddleware)
      .forRoutes('users/data');
    
    // Using a built-in middleware (morgan)
    consumer
      .apply(morgan('tiny'))
      .forRoutes('*');
  }
}
