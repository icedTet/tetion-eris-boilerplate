"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoManager = void 0;
const mongodb_1 = require("mongodb");
//Manager for MongoDB, autoconnecting and stuff.
class MongoManager {
    constructor() { }
    static getInstance() {
        if (!MongoManager.instance) {
            MongoManager.instance = new MongoManager();
        }
        return MongoManager.instance;
    }
    init(connectionURL) {
        this.connectionURL = connectionURL;
        this.client = new mongodb_1.MongoClient(connectionURL);
        this.client.connect();
    }
    initMongo(mongoClient) {
        this.client = mongoClient;
        this.client.connect();
    }
    getClient() {
        return this.client;
    }
}
exports.MongoManager = MongoManager;
