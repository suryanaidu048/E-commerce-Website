import { MongoClient } from "mongodb"

let client
let db

export async function connectDB() {
  if (db) return db

  try {
    client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017/ecobazar")
    await client.connect()
    db = client.db("ecobazar")
    console.log("Connected to MongoDB")
    return db
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export async function getDB() {
  if (!db) {
    await connectDB()
  }
  return db
}
