import { CustomError } from './CustomError';

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor(message: string = 'Invalid credentials') {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
