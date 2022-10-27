import { ForbiddenError } from '@casl/ability';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CHECK_ABILITY, RequireRule } from './ability.decorator';
import { CaslAbilityFactory } from './casl-ability.factory';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    const rules =
      this.reflector.get<RequireRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const ability = this.caslAbilityFactory.defineAbility(request.user);
    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);

        return true;
      });
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
