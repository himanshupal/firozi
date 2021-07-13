import { MongoClient, Collection } from "mongodb"

export const getClient = async (URI?: string): Promise<MongoClient> => {
	const client: MongoClient = new MongoClient(
		process.env.MONGO_URI || URI || "mongodb://localhost/firozi",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	return await client.connect()
}

export const getCollection = <T>(
	name: string,
	client: MongoClient,
	database: string = process.env.DATABASE_NAME
): Collection<T> => {
	return client.db(database).collection(name)
}
