import { SetMetadata, UseGuards } from '@nestjs/common';
import { Action, Subjects } from './casl-ability.factory';
import { applyDecorators } from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { SignupDto } from 'src/common/dtos/auth.dto';
import { CASLUser } from 'src/common/entities/casl-user.entity';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequireRule[]) => {
  return SetMetadata(CHECK_ABILITY, requirements);
};

export class ReadUserAbility implements RequireRule {
  action = Action.Read;
  subject = User;
}
