import { UpdateResult } from "mongodb";
import { MongoManager } from "../Database/MongoManager";
//Simple prefix things, used to store prefixes for guilds.
export type GuildPrefixObject = { prefix: string, guildID: string };
export const getGuildPrefix = (guildID: string) => MongoManager.getInstance().getClient().db('Discord').collection('guilds').findOne({ guildID }).then(x => x?.prefix ?? null) as Promise<string | null>;
export const updateGuildPrefix = (guildID: string, prefix: string) => MongoManager.getInstance().getClient().db('Discord').collection('guilds').updateOne({ guildID }, { $set: { prefix } }, { upsert: true }) as Promise<UpdateResult>;