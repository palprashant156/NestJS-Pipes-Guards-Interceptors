
import { Controller, Get, Post, Body, Req, BadRequestException, UseFilters } from '@nestjs/common';
import type { Request } from 'express';
import { AnyExceptionFilter } from '../exception-filters/any-exception.filter';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }

  // This route is protected by the AuthenticationMiddleware
  @Get('profile')
  findProfile() {
    return 'This action returns the user profile';
  }

  // This route uses the RequestModificationMiddleware
  @Get('data')
  findData(@Req() req: Request) {
    return (req as any).user;
  }

  // Demonstrating a built-in HTTP exception
  @Get('error')
  throwError() {
    throw new BadRequestException('This is a bad request');
  }

  // Demonstrating a scoped exception filter and catching unexpected errors
  @Get('any-error')
  @UseFilters(AnyExceptionFilter)
  throwAnyError() {
    throw new Error('This is an unexpected error');
  }

  @Post()
  create(@Body() createUserDto: any) {
    return 'This action adds a new user';
  }
}