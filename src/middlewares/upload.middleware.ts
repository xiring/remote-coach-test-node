import multer from "multer";
import { v4 } from "uuid";
import { mime } from "serve-static";
import HttpException from "@utils/exceptions/http.exception";

export const MimeTypes = {
  PNG: "image/png",
  JPG: "image/jpg",
  PDF: "image/pdf",
  JPEG: "image/jpeg",
} as const;

export const multerFileFilterer = (
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
  fileTypes,
) => {
  const supportedFileTypes = fileTypes;

  if (supportedFileTypes.includes(file.mimetype)) return callback(null, true);

  return callback(
    new HttpException(
      422,
      `We only support ${supportedFileTypes.join(", ")} file types. Found ${file.mimetype}`,
    ),
  );
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${v4()}.${mime.extension(file.mimetype)}`);
  },
});

const fileLimit: multer.Options["limits"] = { fileSize: 2 * 1024 * 1024 };

const UploadMiddleware = (
  limits = fileLimit,
  mimeTypes: Array<String> = Object.values(MimeTypes),
) => {
  return multer({
    storage,
    limits,
    fileFilter: (req, file, cb) => multerFileFilterer(file, cb, mimeTypes),
  });
};

export default UploadMiddleware;
