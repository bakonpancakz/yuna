import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "therock",
        "type": "CHAT_INPUT",
        "description": "🪨 The rock is cooking"
    },

    invokeFunction: async (int: CommandInteraction) => {

        // Return The Rock
        int.reply({
            "content": "https://media.discordapp.net/attachments/858827129349210162/906643294325444638/ezgif.com-gif-maker.gif"
        })

    }
}