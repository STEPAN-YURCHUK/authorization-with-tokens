import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  
    const PORT = process.env.PORT;

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('AUTH')
        .setDescription('Documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`SERVER WORK! PORT: ${PORT}`));

}

bootstrap();
