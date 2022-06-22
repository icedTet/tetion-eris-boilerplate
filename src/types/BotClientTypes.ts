import Eris from "eris";
import { MongoClient } from "mongodb";
import { BaseCommandArgument } from "./CommandArgumentTypes";

export type BotClientOptions ={
  useTextBasedCommands?: boolean;
  globalPrefix?: string;
  erisOptions?: Eris.ClientOptions;
  mongoURL?: string;
  mongoInstance?: MongoClient;
}
export type CommandContext = {
  message?: Eris.Message;
  channel?: Eris.Channel;
  guild?: Eris.Guild;
  member?: Eris.Member;
  user?: Eris.User;
  args?: string[];
}
export type CommandOptions = {
  name?: string;
  description?: string;
  args?: BaseCommandArgument[]
  aliases?: string[];
  permission?: string;
}
