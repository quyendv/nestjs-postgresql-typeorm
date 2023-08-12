import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
}));

export default appConfig;
