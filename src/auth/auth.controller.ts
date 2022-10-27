import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUserDto, SigninDto, SignupDto } from 'src/common/dtos/auth.dto';
import { Action } from 'src/common/enums/casl-actions.enum';
import { User } from '../common/entities/user.entity';
import { LocalAuthGuard } from './auth-local.guard';
import { LocalStrategy } from './auth-local.strategy';

import { CASLUser } from '../common/entities/casl-user.entity';

import { AuthService } from './auth.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Article } from 'src/common/entities/casl-article.entity';
import jwt_decode from 'jwt-decode';
import { CheckAbilities, ReadUserAbility } from 'src/casl/ability.decorator';
import { ForbiddenError } from '@casl/ability';
import { AbilitiesGuard } from 'src/casl/ability.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @Post('signup')
  // @UseGuards(AbilitiesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() user: SignupDto): Promise<User | never> {
    // const ability = this.abilityFactory.defineAbility(user);
    // const isAllowed = ability.can(Action.Create, User);

    // if (!isAllowed) {
    //   throw new ForbiddenException('you are not admin');
    // }

    return this.authService.signup(user);
  }

  //   @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() user: SigninDto): Promise<any | never> {
    const signedUser = await this.authService.signin(user);
    return signedUser;
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  @Get('user/:id')
  async getUser(@Req() req: any) {
    return this.authService.getUser(req.user.id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('logout')
  // logout(@Res() response: any) {
  //   response
  //    }

  // @Get('user/:id')
  // async getUser(@Param('id') id: string) {
  //   return this.authService.getUser(+id);
  // }
}
