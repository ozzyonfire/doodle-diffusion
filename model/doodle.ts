import { Collection, ObjectId } from "mongodb";
import connect from "./_connect";

export interface Doodle {
  date: string,
  prompt: string,
  predictionId: string,
  input: string, // base64 encoded image
  output: string, // base64 encoded image
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

export async function saveDoodle(doodle: Doodle) {
  if (!collection) {
    collection = await getCollection();
  }

  const result = await collection.findOneAndUpdate({ predictionId: doodle.predictionId }, { $set: doodle }, { upsert: true, returnDocument: "after" });

  return result.value;
}