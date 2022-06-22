import { MongoClient } from "mongodb";
//Manager for MongoDB, autoconnecting and stuff.
export class MongoManager {
  static instance: MongoManager;
  static getInstance() {
    if (!MongoManager.instance) {
      MongoManager.instance = new MongoManager();
    }
    return MongoManager.instance;
  }
  connectionURL: string;
  client?: MongoClient;
  private constructor() { }
  init(connectionURL: string) {
    this.connectionURL = connectionURL;
    this.client = new MongoClient(connectionURL);
    this.client.connect();
  }
  initMongo(mongoClient: MongoClient) {
    this.client = mongoClient;
    this.client.connect();
  }
  getClient() {
    return this.client;
  }
}