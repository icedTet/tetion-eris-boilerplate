import Eris from "eris";
import { DiscordCommand } from ".";
import { BotClient } from "../BotClient";
import { getGuildPrefix } from "../BotClient/PrefixLib";
//Command manager deals with the command registration and handling command triggers
export class CommandManager {
  bot: BotClient;
  commands: Map<string, DiscordCommand>;
  constructor(bot: BotClient) {
    this.bot = bot;
    this.commands = new Map();
    if (this.bot.useTextBasedCommands) {
      this.bot.on('messageCreate', this.handleMessage.bind(this));
    }
  }
  addCommand(command: DiscordCommand) {
    this.commands.set(command.name, command);
  }
  getCommand(name: string): DiscordCommand | undefined {
    return this.commands.get(name.toLowerCase());
  }
  async handleMessage(msg: Eris.Message) {
    const prefix = msg.guildID ? await getGuildPrefix(msg.guildID) ?? this.bot.globalPrefix : this.bot.globalPrefix; //Get the prefix for the guild if it exists, otherwise use the global prefix 
    if (!msg.content.startsWith(prefix)) return;
    const sections = msg.content.substring(prefix.length).split(' '); // split the message into sections by spaces
    //check if the first section is a empty string, if so, ignore it
    if (sections[0] === '') sections.shift()
    let command = this.getCommand(sections[0].toLowerCase()); // get the command from the map
    if (!command) return; // if the command doesn't exist, ignore it
    // if the command has subcommands, check recursively if the next section is a subcommand
    while (command.subcommands && command.subcommands.size > 0 && command.subcommands?.has(sections[1].toLowerCase())) {
      command = command.subcommands.get(sections[1].toLowerCase());
      sections.shift();
    }
    sections.shift()
    //sections now contains the arguments only for the command
    let args = sections;
    if (command.args) {
      // if the command has arguments, check if the user provided enough arguments
      if (args.length < command.args.length) {
        msg.channel.createMessage(`Missing ${command.args.length - (sections.length - 1)} arguments for command ${command.name}`);
        return;
      }
      //merge all sections past the command args length into a single string
      let lastArg = args.splice(command.args.length - 1, args.length).join(' ');
      // readd the last argument to the args array
      args.push(lastArg);
    }
    // call the command handler with the args
    command.handler(this.bot, { message: msg, channel: msg.channel, guild: msg.member.guild, member: msg.member, user: msg.author, args });
    // if the command has parameters, check if the message has enough parameters
  }
}