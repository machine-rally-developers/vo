import mongoose from "mongoose";
let databaseAddress = process.env.DATABASE_ADDRESS;
let database = process.env.DATABASE;
let databasePort = process.env.DATABASE_PORT;

export default () =>
  mongoose.connect(`mongodb://${databaseAddress}:${databasePort}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: database
  });
