export default () => {
  return {
    port: (process.env.PORT || 3000) as number,
    database: {
      name: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: (process.env.POSTGRES_PORT || 5432) as number,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  };
};
