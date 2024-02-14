import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createSwaggerDocument, getApp, globalPrefix } from '@ocmi/api/bootstrap';
import * as process from 'process';

async function bootstrap() {
  const app = await getApp();

  app.useGlobalPipes(new ValidationPipe());
  
  const document = createSwaggerDocument(app);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
