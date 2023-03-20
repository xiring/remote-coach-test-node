import dotenv from "dotenv";
import * as process from "process";
import { IsNotEmpty, IsNumberString, IsString, validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { getValidationError } from "@utils/validation-error";
import chalkLoggerDeclaration from "@config/chalk-logger";

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsNumberString()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  TOKEN_SECRET: string;

  @IsString()
  @IsNotEmpty()
  TOKEN_EXPIRY: string;

  @IsString()
  @IsNotEmpty()
  MICRO_ORM_DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  MICRO_ORM_DB_USER: string;

  @IsString()
  @IsNotEmpty()
  MICRO_ORM_DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MICRO_ORM_DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  MICRO_ORM_DB_PORT: number;
}

const validateEnv = async () => {
  chalkLoggerDeclaration();

  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

  try {
    await validateOrReject(plainToInstance(EnvironmentVariables, process.env));
  } catch (err) {
    logger.error("Environment Variables Validation Error");
    logger.error("*************************************************************************");
    logger.error(Object.values(getValidationError(err)).join("\n"));
    logger.error("*************************************************************************");

    process.exit(-1);
  }
};

export default validateEnv;
