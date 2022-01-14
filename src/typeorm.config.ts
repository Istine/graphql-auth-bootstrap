import { ConnectionOptions } from "typeorm";
import { User } from "./entities/user";

export const typeormConfig: ConnectionOptions = {
  host: "localhost",
  port: 5432,
  username: "postgres",
  type: "postgres",
  password: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
};
