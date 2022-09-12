import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

const db = mongoClient.db("mywallet");

try {
    await mongoClient.connect();
} catch (error) {
    console.log(error)
}

export default db;