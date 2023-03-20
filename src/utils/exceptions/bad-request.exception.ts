import HttpException from "./http.exception";

class BadRequestException extends HttpException {
  error: any;

  constructor(error: any, message: string, status = 422) {
    super(422, message);
    this.error = error;
  }
}

export default BadRequestException;
