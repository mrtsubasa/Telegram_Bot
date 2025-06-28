import {Context} from "grammy";
import Logger from "../Bots/Console/Logs/Logger";
const logger = Logger.getInstance();

export async function developerInfo(ctx: Context) {
    try {
        const developerName = "Tsubasa"; // Replace with the actual developer's name

        const response = `
        Developer Information:\n
        - Name: ${developerName}\n
        - Contact: [Telegram](https://t.me/tsulinks)\n
        `;

        await ctx.reply(response, {
            parse_mode: "Markdown",
            disable_notification: true
        });
    } catch (error) {
        logger.error("Error in developerInfo command: " + error);
        await ctx.reply("An error occurred while processing your request.");
    }
}
