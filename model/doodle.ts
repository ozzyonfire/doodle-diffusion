import { Collection, ObjectId } from "mongodb";
import connect from "./_connect";

export interface Doodle {
  date: string,
  prompt: string,
  predictionId: string,
  input: string, // base64 encoded image
  output: string, // base64 encoded image
  userId: string,
}

let collection: Collection<Doodle>;

async function getCollection() {
  const db = await connect();
  return db.collection<Doodle>("doodles");
}

export async function getDoodle(id: string) {
  if (!collection) {
    collection = await getCollection();
  }

  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getDoodleForUser(userId: string) {
  // get the doodle that matches today's date and the user's id
  if (!collection) {
    collection = await getCollection();
  }

  const today = new Date();

  const result = await collection.findOne({
    userId,
    date: {
      $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
      $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString()
    }
  });

  return result;
}

export async function saveDoodle(doodle: Doodle) {
  if (!collection) {
    collection = await getCollection();
  }

  const result = await collection.findOneAndUpdate({ predictionId: doodle.predictionId }, { $set: doodle }, { upsert: true, returnDocument: "after" });

  return result.value;
}