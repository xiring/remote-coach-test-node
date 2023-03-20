import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class EmailDTO {
  @IsNotEmpty({ message: "Email is Required" })
  @IsEmail({ message: "Invalid Email Address Provided" })
  email: string;
}

export class Login extends EmailDTO {
  @IsNotEmpty({ message: "Password is Required" })
  password: string;
}

export class VerifyForgotPasswordOtp extends EmailDTO {
  @IsNotEmpty({ message: "OTP is Required" })
  otp: number;
}

export class ResetTokenLink {
  @IsNotEmpty({ message: "Token is Required" })
  token: string;
}

export class ResetPasswordToken extends ResetTokenLink {
  @IsNotEmpty({ message: "Password is Required" })
  password: string;
}

export class ChangePassword {
  @IsNotEmpty({ message: "New Password is Required" })
  newPassword: string;

  @IsNotEmpty({ message: "Old Password is Required" })
  oldPassword: string;
}

export class RefreshToken {
  @IsNotEmpty({ message: "Refresh Token is Required" })
  refreshToken: string;
}

export class Register {
  @IsNotEmpty({ message: "First Name is Required" })
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsNotEmpty({ message: "Last Name is Required" })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: "Email is Required" })
  @IsEmail({ message: "Invalid Email Address Provided" })
  email: string;

  @IsNotEmpty({ message: "Phone Number is required" })
  @Length(10, 10, { message: "Phone Number Must be of 10 digits." })
  phoneNumber: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string;
}
