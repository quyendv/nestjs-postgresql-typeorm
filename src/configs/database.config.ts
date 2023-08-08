export const databaseConfig = (): Record<string, any> => ({
  databaseHost: process.env.DB_HOST,
  databaseType: process.env.DB_TYPE,
  databasePort: parseInt(process.env.DB_PORT as string, 10),
  databaseUsername: process.env.DB_USERNAME,
  databasePassword: process.env.DB_PASSWORD,
  databaseName: process.env.DB_DATABASE,
});
