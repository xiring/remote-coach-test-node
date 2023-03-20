import { UserData } from "./interface";
import jwt from "jsonwebtoken";

// import {users} from "../../index";

interface TokenData extends Omit<UserData, "password"> {
  iat: number;
}

export const signResetPasswordToken = (sub: string, expiryTime: string) => {
  try {
    return jwt.sign({ sub }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: expiryTime,
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const signToken = (userData: { [key: string]: any }, sub: string) => {
  const payload = { ...userData, iat: Date.now(), sub };
  try {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.TOKEN_EXPIRY,
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const signRefreshToken = (userData: { [key: string]: any }, sub: string) => {
  const payload = { ...userData, iat: Date.now(), sub };
  try {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const signFirstTimeLoginToken = (sub: string) => {
  try {
    return jwt.sign({ sub }, process.env.FIRST_LOGIN_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.FIRST_LOGIN_TOKEN_EXPIRY,
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const validateToken = (token: string, secret = process.env.TOKEN_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    logger.error(err);
    return null;
  }
};
