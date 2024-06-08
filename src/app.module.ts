import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users/users.controller';
import configuration from './config/configuration.dev';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { IsLoggedMiddleware } from './middlewares/is-logged.middleware';
import { TokenMiddleware } from './middlewares/token.middleware';
import { CorsMiddleware } from './middlewares/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('db'),
        autoLoadEntities: true
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtSecret'),
        global: true
      })
    }),
    UsersModule
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    TokenService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL})

    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })

    consumer
      .apply(IsLoggedMiddleware)
      .forRoutes({ path: '*auth*', method: RequestMethod.ALL })
  }
}
