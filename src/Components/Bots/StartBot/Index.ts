import {BlockWindows} from "../BlockWindows/Index";
import {Bot} from "grammy";
import Logger from "../Console/Logs/Logger";
const logger = Logger.getInstance()
import {RegisterCommands} from "../Handler/RegisterCommands";
async function StartBot(botToken:string) {
    try {
        if (!botToken) {
            throw new Error("Bot token is required");
        }
        const BotInstance = new Bot(botToken);
         await BlockWindows(BotInstance)
        logger.success("[StartBot] Bot is running and listening for updates.");
        // Register commands after the bot has started
        await RegisterCommands(BotInstance);
        logger.success("[StartBot] Commands registered successfully.");
        logger.success(`[StartBot] Bot started successfully with token: ${botToken}`);
         await BotInstance.start()

    } catch (error) {
        console.error("Error starting bot:", error);
        throw new Error("Failed to start bot");
    }
}

export { StartBot}