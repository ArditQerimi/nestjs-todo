import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './common/entities/user.entity';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AbilitiesGuard } from './casl/ability.guard';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Todo, Category],
        synchronize: true,
      }),
    }),
    UserModule,
    CaslModule,
    TodoModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AbilitiesGuard,
    // },
  ],
})
export class AppModule {}
