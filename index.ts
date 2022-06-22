import { BotClient } from "./src/lib/BotClient";
import * as PrefixLib from "./src/lib/BotClient/PrefixLib";
import { MongoManager } from "./src/lib/Database/MongoManager";
import { DiscordCommand } from "./src/lib/DiscordCommand";
import { CommandManager } from "./src/lib/DiscordCommand/CommandManager";
import { DiscordEvent } from "./src/lib/DiscordEvent";
import { GenericTypes, BotClientTypes, CommandArgumentTypes } from "./src/types";
//export everything
export { BotClient, PrefixLib, MongoManager, CommandManager, DiscordCommand, DiscordEvent, GenericTypes, BotClientTypes, CommandArgumentTypes };
