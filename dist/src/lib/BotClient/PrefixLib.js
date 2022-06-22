"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGuildPrefix = exports.getGuildPrefix = void 0;
const MongoManager_1 = require("../Database/MongoManager");
const getGuildPrefix = (guildID) => MongoManager_1.MongoManager.getInstance().getClient().db('Discord').collection('guilds').findOne({ guildID }).then(x => { var _a; return (_a = x === null || x === void 0 ? void 0 : x.prefix) !== null && _a !== void 0 ? _a : null; });
exports.getGuildPrefix = getGuildPrefix;
const updateGuildPrefix = (guildID, prefix) => MongoManager_1.MongoManager.getInstance().getClient().db('Discord').collection('guilds').updateOne({ guildID }, { $set: { prefix } }, { upsert: true });
exports.updateGuildPrefix = updateGuildPrefix;
