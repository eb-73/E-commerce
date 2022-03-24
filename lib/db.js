import { MongoClient } from "mongodb";
import { hash, compare } from "bcrypt";
export const connectToDatabase = async () => {
  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true";
  const client = await MongoClient.connect(url);
  return client;
};
export const insertToCollection = async (client, collection, data) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(data);
  return result;
};

export const hashedPassword = async (pass) => {
  const hashedPass = await hash(pass, 12);
  return hashedPass;
};
export const comparePass = async (newPass, oldPass) => {
  const isEqual = await compare(newPass, oldPass);
  return isEqual;
};
export const createUserGoogle = async (id, name, email) => {
  let client;
  let user;
  let insertedUser;
  try {
    client = await connectToDatabase();
  } catch {
    throw new Error("connect-to-database-failed");
  }
  //
  // find user in database
  const db = client.db();
  user = await db.collection("users").findOne({
    _id: id,
  });
  // create user in database with google data
  if (!user) {
    insertedUser = await db
      .collection("users")
      .insertOne({ _id: id, name, email });
    if (!insertedUser.insertedId) {
      client.close();
      throw new Error("user-not-found");
    }
  }
  client.close();
};
