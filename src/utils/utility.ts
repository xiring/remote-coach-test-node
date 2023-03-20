import * as httpContext from "express-http-context";

export const generatePassword = (length = 6) => {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

export const genOtp = (length = 6) => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return Number(OTP);
};

export const getContextUser = (): ContextUser => {
  return httpContext.get("user") ?? {};
};

export const covertToBase64 = (text: string) => {
  return Buffer.from(text, "binary").toString("base64");
};

export const covertFromBase64 = (base64: string) => {
  return Buffer.from(base64, "base64").toString("binary");
};

export const getClientUrl = (pathname = "") => {
  const link = process.env.CLIENT_BASE_URL;
  return `${link}${pathname[0] === "/" ? pathname : "/" + pathname}`;
};

export const mergeString = (...args: Array<string>) => {
  let merged = "";

  args.forEach((arg, index) => {
    if (arg) merged += `${arg}${index !== args.length - 1 ? " " : ""}`;
  });

  return merged;
};
