import { HttpExceptionFilter } from '@infra/http/utils/http-exception-filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
