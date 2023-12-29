require("dotenv/config");
require("reflect-metadata");
const path = require("path");
const { DataSource } = require("typeorm");

const datasourceConfigurations = () => {
  const entitiesPath = path.join(__dirname, "/entities/**/*.js");
  const migrationsPath = path.join(__dirname, "/migrations/**.js");

  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDatasource = new DataSource(datasourceConfigurations());

module.exports = { AppDatasource };
