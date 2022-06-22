"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordCommand = void 0;
class DiscordCommand {
    constructor(name, handler, subcommands) {
        this.name = name.toLowerCase();
        this.handler = handler;
        if (subcommands) {
            this.subcommands = new Map();
            subcommands.forEach((subcommand) => {
                this.subcommands.set(subcommand.name.toLowerCase(), subcommand);
            });
        }
    }
    init(bot) {
    }
}
exports.DiscordCommand = DiscordCommand;
