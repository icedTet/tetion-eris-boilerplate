import Eris, { ClientEvents } from "eris";
import { PrefixParameters } from "../../types/GenericTypes";
import { BotClient } from "../BotClient";
export class DiscordEvent<K extends keyof ClientEvents> {
  event: string;
  handler: PrefixParameters<[bot: BotClient], (...args: ClientEvents[K]) => void>;
  bot?: BotClient;
  constructor(
    event: K,
    handler: PrefixParameters<[bot: BotClient], (...args: ClientEvents[K]) => void>
  ) {
    this.event = event;
    this.handler = handler;
  }
  init(bot: BotClient) {
    this.bot = bot;
    // @ts-ignore
    bot.on(this.event, (...args: ClientEvents[K]) =>
      this.handler(bot, ...args)
    );
  }

}