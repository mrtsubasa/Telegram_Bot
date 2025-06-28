import {Context} from "grammy";

import Logger from "../Bots/Console/Logs/Logger";
const logger = Logger.getInstance();

export async function botInfo(ctx: Context) {
    try {
        const Response = `
        Bot Information:\n 
        - Bot Username : ${ctx.me.first_name}\n
        - Bot ID : ${ctx.me.id}\n
        - Bot Language Code: Typescript\n`
        await ctx.reply(Response, {
            parse_mode: "Markdown",
            disable_notification: true
        });
    } catch (error) {
        logger.error("Error in botInfo command:" + error);
        await ctx.reply("An error occurred while processing your request.");
    }
}
