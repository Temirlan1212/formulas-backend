import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: false,
  });
  app.enableCors({
    origin: true, // Restrict to a specific origin
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add headers that your frontend may include
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
