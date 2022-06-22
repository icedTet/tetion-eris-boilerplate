import Eris from "eris";
import { BotClientOptions } from "../../types/BotClientTypes";
import { MongoManager } from "../Database/MongoManager";
import { DiscordCommand } from "../DiscordCommand";
import { CommandManager } from "../DiscordCommand/CommandManager";
import { DiscordEvent } from "../DiscordEvent";
import * as fs from "fs/promises";
//Define the BotClient class
export class BotClient extends Eris.Client {
  useTextBasedCommands: boolean;
  globalPrefix: string;
  commandManager: CommandManager;
  constructor(token: string, options?: BotClientOptions) {
    super(token, options?.erisOptions);
    this.useTextBasedCommands = options?.useTextBasedCommands || false;
    this.globalPrefix = options?.globalPrefix || "";
    if (this.useTextBasedCommands) {

    }
    if (!options.mongoURL && !options.mongoInstance) throw new Error("Mongo URL or Instance is required");
    if (options.mongoURL)
      MongoManager.getInstance().init(options?.mongoURL);
    else
      MongoManager.getInstance().initMongo(options?.mongoInstance);
    this.commandManager = new CommandManager(this);
  }
  loadCommands(commands: DiscordCommand[] | DiscordCommand) {
    Array.isArray(commands) ? commands.forEach(command => {
      this.commandManager.addCommand(command)
      command.init(this)
    }) : this.commandManager.addCommand(commands)
  }
  loadEvents(events: DiscordEvent<any>[] | DiscordEvent<any>) {
    Array.isArray(events) ? events.forEach(event => {
      this.on(event.event, event.handler)
    }) : this.on(events.event, events.handler)
  }
  async loadCommandsFromDir(dir: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = `${dir}/${file}`;
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await this.loadCommandsFromDir(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.ts')) {
        const commandFile = await import(filePath);
        if (commandFile.default) {
          this.loadCommands(commandFile.default);
        }
      }
    }
  }
  async loadEventsFromDir(dir: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = `${dir}/${file}`;
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await this.loadEventsFromDir(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.ts')) {
        const eventFile = await import(filePath);
        if (eventFile.default) {
          this.loadEvents(eventFile.default);
        }
      }
    }
  }
}
