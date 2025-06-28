import dotenv from 'dotenv';
dotenv.config();
import { StartBot} from "./Components/Bots/StartBot/Index";

async function main() {
    try {
        const botToken = process.env.BOT_TOKEN;
        if (!botToken) {
            throw new Error("BOT_TOKEN is not defined in the environment variables");
        }
        await StartBot(botToken);
    } catch (error) {
        console.error("Error in main function:", error);
    }
}
main().catch(error => {
    console.error("Unhandled error in main:", error);
});