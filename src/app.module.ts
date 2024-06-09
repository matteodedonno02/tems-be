import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import configuration from './config/configuration.dev';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { IsLoggedMiddleware } from './middlewares/is-logged.middleware';
import { TokenMiddleware } from './middlewares/token.middleware';
import { ArticleModule } from "./modules/article.module";
import { CategoryModule } from "./modules/category.module";
import { CategoryController } from './controllers/category.controller';
import { ArticleController } from './controllers/article.controller';
import { CategoryService } from './services/category.service';
import { ArticleService } from './services/article.service';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { SoldItemModule } from "./modules/sold-item.module";
import { SoldItemService } from "./services/sold-item.service";
import { SoldItemController } from "./controllers/sold-item.controller";

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
    UsersModule,
    ArticleModule,
    CategoryModule,
    SoldItemModule
  ],
  controllers: [
    UsersController,
    CategoryController,
    ArticleController,
    SoldItemController
  ],
  providers: [
    UsersService,
    TokenService,
    CategoryService,
    ArticleService,
    SoldItemService
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
