import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('port') || 8000;
  await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
bootstrap();
