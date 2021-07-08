import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule, { cors: true });
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3030',
        credentials: true
    });
    app.setGlobalPrefix('/api/v1');
    app.use(cookieParser());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
