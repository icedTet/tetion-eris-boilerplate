import { CommandContext } from "../../types/BotClientTypes";
import { BaseCommandArgument } from "../../types/CommandArgumentTypes";
import { PrefixParameters } from "../../types/GenericTypes";
import { BotClient } from "../BotClient";

export class DiscordCommand {
  name: string;
  handler: (bot: BotClient, context: CommandContext) => void;
  bot?: BotClient;
  subcommands?: Map<string, DiscordCommand>;
  args?: BaseCommandArgument[]
  constructor(
    name: string,
    handler: (bot: BotClient, context: CommandContext) => void,
    subcommands?: DiscordCommand[]
  ) {
    this.name = name.toLowerCase();
    this.handler = handler;
    if (subcommands) {
      this.subcommands = new Map();
      subcommands.forEach((subcommand) => {
        this.subcommands.set(subcommand.name.toLowerCase(), subcommand);
      });
    }
  }
  init(bot: BotClient) {

  }
}