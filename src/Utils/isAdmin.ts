import { Context} from "grammy";
import Logger from "../Components/Bots/Console/Logs/Logger";
const logger = Logger.getInstance();
export async function isAdmin(ctx: Context, userId: number) {
    try {
        const chat = ctx.chat;
        if (!chat) {
            logger.error("Chat context is not available");
            return false;
        }

        const member = await ctx.getChatMember(userId);
      if (member.status === "administrator" || member.status === "creator") {
            return true;
      } else if (member.status === "member") {
            return false;
      }
    } catch (error) {
        logger.error(`Error checking admin status for user ${userId}:` + error);
        return false;
    }

}