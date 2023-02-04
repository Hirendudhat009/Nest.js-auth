import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false },
    }),
  );
  console.log(process.env.APP_URL);
  const config = new DocumentBuilder()
    .setTitle('Nest.js Auth')
    .setDescription('Nest.js auth APIs')
    .setVersion('3.0')
    .addBearerAuth()
    .addServer(process.env.APP_URL, 'Localhost')
    // .addServer(devUrl, 'Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
