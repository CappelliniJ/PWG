// Import the required packages for interacting with a database
const { MongoClient } = require('mongodb');

// Define the database URI and options
const uri = 'mongodb://localhost:27017';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Define the name of the database and collection
const dbName = 'passwords';
const collectionName = 'passwords';

// Connect to the database
const client = new MongoClient(uri, options);
client.connect().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Define the function to insert a new password into the collection
async function insertPassword(password) {
  const collection = client.db(dbName).collection(collectionName);
  const result = await collection.insertOne({ password: password });
  return result.insertedId;
}

// Define the function to check if a password already exists in the collection
async function checkIfPasswordExists(password) {
  const collection = client.db(dbName).collection(collectionName);
  const result = await collection.findOne({ password: password });
  return result !== null;
}

module.exports = { insertPassword, checkIfPasswordExists };
