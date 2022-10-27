import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  validate(payload: any) {
    // console.log(payload)
    return payload;
  }
  // const user = await this.authService.
  // const user = await this.authService.validateUser(username, password);
  // if (!user) {
  //   throw new UnauthorizedException();
  // }
  // return user;
  // async validate(username: string, password: string): Promise<any> {
  // }
}
