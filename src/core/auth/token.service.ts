import { Singleton } from "@utils/decorators/singleton";
import jwt from "jsonwebtoken";

@Singleton
export class TokenService {
  private handleSignToken = (
    payload: { [key: string]: any; sub: string },
    tokenSecret: string,
    expiry: string,
  ) => {
    try {
      return jwt.sign({ ...payload }, tokenSecret, {
        algorithm: "HS256",
        expiresIn: expiry,
      });
    } catch (err) {
      logger.error(err);
      return null;
    }
  };

  signToken = (userData: { [key: string]: any }, sub: string) => {
    const payload = { ...userData, sub };
    return this.handleSignToken(payload, process.env.TOKEN_SECRET, process.env.TOKEN_EXPIRY);
  };

  signRefreshToken = (userData: { [key: string]: any }, sub: string) => {
    const payload = { ...userData, sub };
    return this.handleSignToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRY,
    );
  };

  signFirstTimeLoginToken = (sub: string) => {
    const payload = { sub };
    return this.handleSignToken(
      payload,
      process.env.FIRST_LOGIN_TOKEN_SECRET,
      process.env.FIRST_LOGIN_TOKEN_EXPIRY,
    );
  };
}
