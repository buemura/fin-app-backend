import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseHandler } from '@infra/http/utils/reponse-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseHandler());
  await app.listen(process.env.PORT);
}
bootstrap();
