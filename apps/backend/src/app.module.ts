import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OptionModule } from './option/option.module';
import { PublisherModule } from './publisher/publisher.module';
import { PostModule } from './post/post.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    OptionModule,
    PublisherModule,
    PostModule,
  ],
  providers: [],
})
export class AppModule {}
