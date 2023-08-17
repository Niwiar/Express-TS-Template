// interface HttpError {
//   status?: number;
//   name: string;
//   message: string;
//   stack?: string;
// }

export class HttpError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
