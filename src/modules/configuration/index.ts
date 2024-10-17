import AuthModule from './auth/auth.module';
import HealthModule from './health/health.module';
import AppHttpModule from './http/http.module';
import LoggingModule from './logging/logging.module';
import DatabaseModule from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from '../application/customer/customer.module';

export const ConfigurationModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: globalThis.ENV_FILE || 'environments/.env',
  }),
  AuthModule,
  HealthModule,
  AppHttpModule,
  LoggingModule,
  DatabaseModule,
  CustomerModule,
];
