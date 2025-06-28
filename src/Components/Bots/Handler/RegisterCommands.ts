import {Bot} from "grammy";
import {botInfo} from "../../Commands/botInfo";

import Logger from "../Console/Logs/Logger";
const logger = Logger.getInstance();
import {developerInfo} from "../../Commands/developerInfo";
export async function RegisterCommands(bot: Bot) {
    try {
        // Register the botInfo command
       await bot.api.setMyCommands(
            [
                {
                    command: "botinfo",
                    description: "Get information about the bot"
                },
                {
                    command: "developerinfo",
                    description: "Get information about the developer"
                }
            ]
        );


        // Handle the botInfo command
        bot.command("botinfo", async (ctx) => {
            await botInfo(ctx);
        })
        // Handle the developerInfo command
        bot.command("developerinfo", async (ctx) => {
            await developerInfo(ctx);
        });


        logger.success("[RegisterCommands] Commands registered successfully.");
    } catch (error) {
        logger.error("[RegisterCommands] Error registering commands: " + error);
    }
}