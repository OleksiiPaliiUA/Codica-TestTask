import { Module } from '@nestjs/common';
import { Dialect } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvEnum } from '@common';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: await configService.get(EnvEnum.DATABASE_URL),
        dialect: 'postgres' as Dialect,
        autoLoadModels: true,
        synchronize: true,
        logging: false,
        dialectOptions:
          (await configService.get(EnvEnum.IS_SUPPORT_SSL)) === 'true'
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false,
                },
              }
            : {},
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class DatabaseModule {}
