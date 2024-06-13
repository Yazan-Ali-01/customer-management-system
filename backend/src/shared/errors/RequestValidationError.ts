import { ValidationError } from 'class-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: Object.values(err.constraints!).join(', '), field: err.property };
    });
  }
}
