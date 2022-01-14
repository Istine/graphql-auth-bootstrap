import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { typeormConfig } from "./typeorm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";

process.on("unhandledRejection", (reason, _) => {
  console.log("reason:", reason);
  throw new Error(reason as string);
});

const main = async () => {
  try {
    await createConnection(typeormConfig);
    const app = express();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
        validate: false,
      }),
    });

    app.listen(4000, () => {
      console.info("Server is Listening on port 4000");
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api/v1/auth" });
  } catch (error) {
    console.error(error.message);
  }
};

main();
