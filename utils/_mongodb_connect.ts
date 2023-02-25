import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI || '';
const options: MongoClientOptions = {
  maxPoolSize: 10,
}

let client: MongoClient = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    console.log('🔥 Creating new mongo client.');
    global._mongoClientPromise = client.connect();
  } else {
    console.log('👌 Reusing existing MongoDB connection.');
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  console.log('🔥 Creating new mongo client (production).');
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise