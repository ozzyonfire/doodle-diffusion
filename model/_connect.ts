import clientPromise from "@/utils/_mongodb_connect";
const dbName = "doodle-app";

export default async function connect() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db;
}