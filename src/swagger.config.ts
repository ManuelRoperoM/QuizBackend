import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('QuizGame')
    .setDescription('Quiz Game es un API que permite crear y jugar diferentes TEST')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}