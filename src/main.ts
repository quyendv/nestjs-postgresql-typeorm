import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('app.port') || 8000;
  await app.listen(
    PORT,
    // () => console.log(`Server is running on port ${PORT}`),
    () => Logger.debug(`Server is running on port ${PORT}`, 'main.ts'), // TODO: custom logger that can custom show log by env, // TODO: fix path migration in package.json -> thường để ra ngoài src vì khi build trong dist ở ngoài hay trong src đều cùng cấp (hoặc trỏ thẳng vào dist)
  );
}
bootstrap();
