import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  // @IsString()
  // role: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CurrentUserDto {
  @IsEmail()
  email: string;
}
