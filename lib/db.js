import { MongoClient } from "mongodb";
import { hash, compare } from "bcrypt";
export const connectToDatabase = async () => {
  const url =
    "mongodb+srv://Ebrahim-73:cKTJ9xmjziQKHPAe@cluster0.kbxqj.mongodb.net/shop?retryWrites=true&w=majorityy";
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
