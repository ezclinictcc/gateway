import { DataSource } from "typeorm";
import { CreateCredential1659896492936 } from "./migrations/credential/1659896492936-CreateCredential";
import { CreateLogin1659896492936 } from "./migrations/login/1659896492936-CreateLogin";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "https://ezclinik-gateway.herokuapp.com",
  port: 5432,
  username: "nduxtcjfrhelql",
  password: "58f411535c195a9e2b34f08c7c63b488d16287abc50734fc806c522780475563",
  database: "ddj291li1ilr8k",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/**/*.ts"],
  subscribers: [],
  migrations: [CreateLogin1659896492936, CreateCredential1659896492936],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrationsTransactionMode: "all",
});

const AppDataSourceDocker = new DataSource({
  type: "postgres",
  host: "172.22.0.5",
  port: 5432,
  username: "gtw_user",
  password: "pwdgtw",
  database: "GTW_DB",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/**/*.ts"],
  subscribers: [],
  migrations: [CreateLogin1659896492936, CreateCredential1659896492936],
  migrationsTransactionMode: "all",
});

export default AppDataSource;
