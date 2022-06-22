"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordEvent = void 0;
class DiscordEvent {
    constructor(event, handler) {
        this.event = event;
        this.handler = handler;
    }
    init(bot) {
        this.bot = bot;
        // @ts-ignore
        bot.on(this.event, (...args) => this.handler(bot, ...args));
    }
}
exports.DiscordEvent = DiscordEvent;
