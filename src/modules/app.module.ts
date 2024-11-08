import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import OpenApiExceptionFilter from '../filters/openapi.filter';
import LoggingInterceptor from '../interceptors/logging.interceptor';
import openapiValidatorMiddleware from '../middlewares/openapi.middleware';
import { ConfigurationModules } from './configuration';
import { CustomerModule } from './application/customer/customer.module';
import { DiaryModule } from './application/diary/diary.module';

@Module({
  imports: [...ConfigurationModules, CustomerModule, DiaryModule],
  providers: [
    { provide: APP_FILTER, useClass: OpenApiExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(...openapiValidatorMiddleware).forRoutes('*');
  }
}
