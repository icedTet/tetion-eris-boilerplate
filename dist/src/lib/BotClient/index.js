"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const eris_1 = __importDefault(require("eris"));
const MongoManager_1 = require("../Database/MongoManager");
const CommandManager_1 = require("../DiscordCommand/CommandManager");
const fs = __importStar(require("fs/promises"));
//Define the BotClient class
class BotClient extends eris_1.default.Client {
    constructor(token, options) {
        super(token, options === null || options === void 0 ? void 0 : options.erisOptions);
        this.useTextBasedCommands = (options === null || options === void 0 ? void 0 : options.useTextBasedCommands) || false;
        this.globalPrefix = (options === null || options === void 0 ? void 0 : options.globalPrefix) || "";
        if (this.useTextBasedCommands) {
        }
        if (!options.mongoURL && !options.mongoInstance)
            throw new Error("Mongo URL or Instance is required");
        if (options.mongoURL)
            MongoManager_1.MongoManager.getInstance().init(options === null || options === void 0 ? void 0 : options.mongoURL);
        else
            MongoManager_1.MongoManager.getInstance().initMongo(options === null || options === void 0 ? void 0 : options.mongoInstance);
        this.commandManager = new CommandManager_1.CommandManager(this);
    }
    loadCommands(commands) {
        Array.isArray(commands) ? commands.forEach(command => {
            this.commandManager.addCommand(command);
            command.init(this);
        }) : this.commandManager.addCommand(commands);
    }
    loadEvents(events) {
        Array.isArray(events) ? events.forEach(event => {
            this.on(event.event, event.handler);
        }) : this.on(events.event, events.handler);
    }
    loadCommandsFromDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(dir);
            for (const file of files) {
                const filePath = `${dir}/${file}`;
                const stats = yield fs.stat(filePath);
                if (stats.isDirectory()) {
                    yield this.loadCommandsFromDir(filePath);
                }
                else if (file.endsWith('.js') || file.endsWith('.ts')) {
                    const commandFile = yield Promise.resolve().then(() => __importStar(require(filePath)));
                    if (commandFile.default) {
                        this.loadCommands(commandFile.default);
                    }
                }
            }
        });
    }
    loadEventsFromDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(dir);
            for (const file of files) {
                const filePath = `${dir}/${file}`;
                const stats = yield fs.stat(filePath);
                if (stats.isDirectory()) {
                    yield this.loadEventsFromDir(filePath);
                }
                else if (file.endsWith('.js') || file.endsWith('.ts')) {
                    const eventFile = yield Promise.resolve().then(() => __importStar(require(filePath)));
                    if (eventFile.default) {
                        this.loadEvents(eventFile.default);
                    }
                }
            }
        });
    }
}
exports.BotClient = BotClient;
