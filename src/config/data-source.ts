import { DataSource } from 'typeorm';
import configuration from './configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseConfig = configuration().database;

const dataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.name,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});

export default dataSource;
