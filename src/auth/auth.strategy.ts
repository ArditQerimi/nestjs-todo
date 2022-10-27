import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/common/entities/user.entity';
// import { AuthHelper } from './auth.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) config: ConfigService) {
    const JWT_KEY: string = config.get<string>('JWT_KEY');
    super({
      jwtFromRequest: (req) => {
        // if (!req || !req.cookies) return null;
        if (!req || !req.headers.authorization) return null;
        return req.headers.authorization.replace('Bearer ', '');
        // return req.cookies['access_token'];
      },
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY,
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
