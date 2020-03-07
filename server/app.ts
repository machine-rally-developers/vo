import dotenv from "dotenv";
dotenv.config();
import express from "express";
import moduleRoutes from "./routes/module.route";
import voClientRouter from "./routes/voclient.route";
import bodyParser from "body-parser";
import databaseConnection from "./database/connection/connection";
import path from "path";
import fs from "fs";
import graphqlHTTP from "express-graphql";
import schema from "./database/graphql/root.schema";
//start environmental variables

databaseConnection()
  .then(() => {
    console.log(`Connected to database ${new Date()}`);
    //check if module and temp folder exists
    let moduleFolderPath = path.join(__dirname, "modules");
    let tempFolderPath = path.join(__dirname, "temp");
    if (!fs.existsSync(moduleFolderPath)) {
      fs.mkdir(moduleFolderPath, err => {
        if (err)
          console.error(
            `Could not make a module folder. Please do this manually`
          );
      });
    }
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdir(tempFolderPath, err => {
        if (err)
          console.error(
            `Could not make a temp folder. Please do this manually`
          );
      });
    }
    let app = express();
    let port = process.env.APP_PORT;
    //add bodyparser to parse json content
    app.use(bodyParser.json());
    //add routes middleware
    app.use("/", [moduleRoutes, voClientRouter]);
    //initialize graphql root
    app.use(
      "/graphql",
      graphqlHTTP(async (request, response, graphQLParams) => ({
        schema,
        graphiql: process.env.NODE_ENV === "development" ? true : false
        //context: authentication(request, response, graphQLParams)
      }))
    );
    app.listen(port, () =>
      console.log(`Listening at port ${port} at ${new Date()}`)
    );
  })
  .catch(error => {
    console.log(`Error starting app. Make sure environment variables is configured
      Required variables{
        PORT
        DATABASE
        DATABASE_ADDRESS
        DATABASE_PORT
        DATABASE_USER
        DATABASE_PASSWORD
      }
      App error message{
        ${error}
      }`);
  });
