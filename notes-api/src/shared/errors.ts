import { HTTP_STATUS } from './constants';

export class BadRequestError extends Error {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  statusCode = HTTP_STATUS.FORBIDDEN;
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  statusCode = HTTP_STATUS.NOT_FOUND;
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends Error {
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
  }
} 