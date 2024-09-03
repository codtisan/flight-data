import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const environment = process.env.ENVIRONMENT || 'development';
  console.log(environment);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
