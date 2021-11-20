import { ApplicationCommandDataResolvable, ApplicationCommandPermissionData, Interaction } from "discord.js";

declare interface BotCommand {
    structure: ApplicationCommandDataResolvable,
    permissions: ApplicationCommandPermissionData[],
    invokeFunction(int: Interaction): any,
    disabled?: boolean,
}