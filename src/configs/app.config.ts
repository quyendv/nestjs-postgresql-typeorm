export const appConfig = (): Record<string, any> => ({
  port: parseInt(process.env.PORT as string, 10),
});
