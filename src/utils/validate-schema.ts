import { validateOrReject } from "class-validator";
import BadRequestException from "@utils/exceptions/bad-request.exception";
import FileUploadException from "@utils/exceptions/file-upload.exception";
import * as console from "console";
import { plainToInstance } from "class-transformer";

const validateSchema = async <T extends Class>(Schema: T, data: Object, filePath?: string) => {
  try {
    await validateOrReject(plainToInstance(Schema, data));
  } catch (err) {
    console.log(JSON.stringify(err.map((e) => e.constraints)));
    if (filePath) throw new FileUploadException(err, filePath, "Invalid Request Data sent in Body");
    throw new BadRequestException(err, "Invalid Request Data sent in Body");
  }
};

export default validateSchema;
