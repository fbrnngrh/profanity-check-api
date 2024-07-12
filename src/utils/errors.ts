export class AppError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class AuthenticationError extends AppError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  export class RateLimitError extends AppError {
    constructor(message: string) {
      super(message, 429);
    }
  }