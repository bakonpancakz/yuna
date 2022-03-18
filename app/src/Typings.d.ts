import { ApplicationCommandDataResolvable, Interaction, PermissionResolvable } from "discord.js";

declare global {

    interface BotCommand {
        structure: ApplicationCommandDataResolvable;
        memberPermissions: PermissionResolvable[];
        invokeFunction(int: Interaction): any;
    }

    namespace NodeJS {
        interface ProcessEnv {
            YUNA_TOKEN: string;         // REQUIRED - Discord Bot Token
            YUNA_REDIS: string;         // REQUIRED - Redis Database URI
            YUNA_UPVOTE?: string;       // Optional - Emoji for upvotes, defaults to 🔺
            YUNA_DOWNVOTE?: string;     // Optional - Emoji for downvotes, defaults to 🔻
            // TZ: string;              // Optional - Time Zone
        }
    }

}