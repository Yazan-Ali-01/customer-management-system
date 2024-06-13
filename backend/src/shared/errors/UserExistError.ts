import { CustomError } from './CustomError';

export class UserExistError extends CustomError {
  statusCode = 400;
  reason = 'User already exist.';

  constructor() {
    super('User already exist.');
    Object.setPrototypeOf(this, UserExistError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
