const { MongoClient, ServerApiVersion } = require("mongodb");

let db;

const connectDb = async () => {
  if (db) return db;

  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@babelforge.sa2b6.mongodb.net/?retryWrites=true&w=majority&appName=BabelForge`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("babelforgeDB");
    return db;
  } catch (e) {}
};

export default connectDb;
