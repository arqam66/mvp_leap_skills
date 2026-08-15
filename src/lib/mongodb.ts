import { MongoClient, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  if (globalForMongo._mongoClient) {
    return { client: globalForMongo._mongoClient, db: globalForMongo._mongoClient.db() };
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  globalForMongo._mongoClient = client;

  return { client, db: client.db() };
}

export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}
