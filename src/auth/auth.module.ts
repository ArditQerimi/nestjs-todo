import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/common/entities/user.entity';
import { LocalStrategy } from './auth-local.strategy';
import { CASLUser } from 'src/common/entities/casl-user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AbilityModule } from 'src/casl/ability.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AbilitiesGuard } from 'src/casl/ability.guard';
import { Todo } from 'src/todo/entities/todo.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
        signOptions: { expiresIn: config.get<number>('JWT_EXPIRE') },
      }),
    }),
    TypeOrmModule.forFeature([User, CASLUser, Todo]),
    AbilityModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    AbilitiesGuard,
    LocalStrategy,
    JwtStrategy,
    CaslAbilityFactory,
  ],
})
export class AuthModule {}
