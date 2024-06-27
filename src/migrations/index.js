import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../config/database.js";
import path from "path";

const umzug = new Umzug({
  migrations: { glob: path.join("migrations/*.js") },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  await umzug.up();
  console.log("Migrations executed successfully.");
} catch (error) {
  console.error("Unable to connect to the database or run migrations:", error);
}
