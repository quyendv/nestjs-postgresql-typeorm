export const envConfig = (): Record<string, any> => ({
  APP: { PORT: process.env.PORT },
  DATABASE: {
    TYPE: process.env.DB_TYPE,
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
});
