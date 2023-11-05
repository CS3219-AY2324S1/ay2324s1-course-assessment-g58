import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import config from "config";

export async function connectToDb(type: string) {  
  let dbUri: string = '';
  dbUri = config.get<string>(type);
  mongoose.set('strictQuery', true);

  try {    
    console.log("dbUri", dbUri);
    await mongoose.connect(dbUri, {monitorCommands: true, family: 4});
    console.log("Connected to DB at: ", dbUri);    
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
}