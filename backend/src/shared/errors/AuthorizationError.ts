import { CustomError } from './CustomError';

export class AuthorizationError extends CustomError {
  statusCode = 403;

  constructor(message: string = 'Authorization failed. Please log in again.') {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
