import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from 'src/common/dtos/auth.dto';
import { CASLUser } from 'src/common/entities/casl-user.entity';
import { User } from 'src/common/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
export enum Roles {
  Reader = 'reader', //read
  User = 'user', //read, create, update
  isAdmin = 'isAdmin', //manage
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (user?.isAdmin) {
      can(Action.Manage, 'all');

      // can(Action.Read, 'all');
      // can(Action.Create, 'all');
      // can(Action.Update, 'all');
      // can(Action.Delete, 'all');
    } else {
      can(Action.Read, User);
      cannot(Action.Create, User).because('your special message: only admins!');
      can(Action.Update, User);
      cannot(Action.Update, User, { id: { $ne: user.id } }).because(
        'User can only update there own user'
      );

      can(Action.Delete, User);
      cannot(Action.Delete, User, { id: { $ne: user.id } }).because(
        'User can only delete there own user'
      );
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
