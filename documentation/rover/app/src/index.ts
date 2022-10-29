import { readFileSync } from "fs";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer, ContextFunction } from "@apollo/server";
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from "@apollo/server/standalone";

const port = process.env.PORT ?? "4001";
import resolvers from "./resolvers";
const subgraphName = require("../package.json").name;
import { DataSourceContext } from "./types/DataSourceContext";

const context: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  DataSourceContext
> = async ({ req }) => ({
  auth: req.headers.authorization,
});

async function main() {
  let typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: Number.parseInt(port) },
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run 'rover dev --url ${url} --name ${subgraphName}`);
}

main();
