import os from 'os';
import { Bot} from "grammy";
import Logger from "../Console/Logs/Logger";
const logger = Logger.getInstance()
async function BlockWindows(bot:Bot) :Promise<void>{
    try {
        if (os.platform() === "win32") {
            logger.warning(`[SYSTEM] Windows System detected , bot will be turned off`);
            await process.exit();
        }
    } catch (error) {
        logger.error(`[SYSTEM] Error in BlockWindows: ${error}`);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export { BlockWindows}