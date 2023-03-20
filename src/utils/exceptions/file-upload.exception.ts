import BadRequestException from "@utils/exceptions/bad-request.exception";

class FileUploadException extends BadRequestException {
  filePath: string;

  constructor(error: any, filePath: string, message: string, status = 422) {
    super(error, message, status);
    this.filePath = filePath;
  }
}

export default FileUploadException;
