# NestJS Middleware and Exception Filters

This document provides a comprehensive overview of Middleware and Exception Filters in NestJS.

## NestJS Middleware

### What is Middleware in NestJS?

Middleware is a function that is called before the route handler. Middleware functions have access to the request and response objects, and the `next()` middleware function in the application’s request-response cycle. The `next()` middleware function is commonly denoted by a variable named `next`.

<br/>

### How it differs from Express middleware

NestJS middleware is, by default, equivalent to Express middleware. The following description from the official Express documentation describes middleware well:

Middleware functions can perform the following tasks:
- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

<br/>

### Built-in vs Custom Middleware

NestJS does not come with any built-in middleware. However, you can use any Express middleware in your NestJS application.

Custom middleware can be created to perform specific tasks, such as logging, authentication, or request modification. In this project, we have created a custom logging middleware in the `src/middleware/logging.middleware.ts` file.

<br/>

### Applying Middleware

Middleware can be applied globally, at the module level, and per route.

- **Global Middleware:** To apply middleware globally, you can use the `use()` method of the INestApplication instance. We have applied the `HttpExceptionFilter` globally in the `src/main.ts` file.
- **Module-level Middleware:** To apply middleware at the module level, you can use the `configure()` method of the module class. We have applied the `LoggingMiddleware` at the module level in the `src/app.module.ts` file.
- **Per-route Middleware:** To apply middleware per route, you can use the `apply()` method of the `MiddlewareConsumer` instance.

<br/>

### Accessing Request/Response Objects

Middleware functions have access to the request and response objects. You can use these objects to get information about the request and to send a response to the client.

<br/>

### Middleware Execution Order

The execution order of middleware is determined by the order in which they are applied. If you have multiple global middleware, they will be executed in the order in which they are applied. The same applies to module-level and per-route middleware.

<br/>

### Use Cases

- **Logging:** Middleware can be used to log information about incoming requests, such as the request method, URL, and IP address.
- **Authentication:** Middleware can be used to authenticate users and to protect routes from unauthorized access.
- **Request Modification:** Middleware can be used to modify the request object before it is passed to the route handler.

<br/>

## NestJS Exception Filters

### Understanding NestJS Exception Handling Flow

The exception handling flow in NestJS is as follows:
1. An exception is thrown.
2. NestJS looks for a local exception filter that can handle the exception.
3. If no local exception filter is found, NestJS looks for a global exception filter.
4. If no global exception filter is found, NestJS uses its built-in exception handler to handle the exception.

<br/>

### Built-in HTTP Exceptions

NestJS comes with a set of built-in HTTP exceptions that you can use in your application. These exceptions are all subclasses of the `HttpException` class.

Some of the built-in HTTP exceptions are:
- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `InternalServerErrorException`

<br/>

### Global vs Scoped Exception Filters

- **Global Exception Filters:** Global exception filters are applied to all routes in the application. You can apply a global exception filter using the `useGlobalFilters()` method of the `INestApplication` instance.
- **Scoped Exception Filters:** Scoped exception filters are applied to a specific controller or route handler. You can apply a scoped exception filter using the `@UseFilters()` decorator.

<br/>

### Creating Custom Exception Filters

You can create custom exception filters to handle specific exceptions in your application. To create a custom exception filter, you need to create a class that implements the `ExceptionFilter` interface.

In this project, we have created a custom exception filter in the `src/exception-filters/http-exception.filter.ts` file.

<br/>

### Formatting Consistent Error Responses

Exception filters can be used to format consistent error responses across all endpoints. This can be done by creating a custom exception filter that formats the error response in a consistent way.

<br/>

### Catching and Handling Unexpected Errors

You can use exception filters to catch and handle unexpected errors in your application. This can be done by creating a custom exception filter that catches all exceptions and sends a generic error response to the client.

<br/>

### Request Lifecycle Involving Middleware and Exception Filters

The request lifecycle in NestJS, involving middleware and exception filters, is as follows:
1. A request is received by the application.
2. The request is passed through the global middleware.
3. The request is passed through the module-level middleware.
4. The request is passed through the per-route middleware.
5. The request is handled by the route handler.
6. If an exception is thrown, it is handled by the exception filters.
7. A response is sent to the client.