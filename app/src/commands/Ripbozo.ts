import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "ripbozo",
        "type": "CHAT_INPUT",
        "description": "😂 RIP BOZO L"
    },

    invokeFunction: async (int: CommandInteraction) => {

        int.reply({ "content": "https://i.imgur.com/SD26BFu.gif" })

    }
}