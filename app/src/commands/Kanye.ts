import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "kanye",
        "type": "CHAT_INPUT",
        "description": "💽 No one man should have all that power"
    },

    invokeFunction: async (int: CommandInteraction) => {

        // Return Kanye
        int.reply({
            "content": "https://tenor.com/view/kanye-west-dance-dancing-moves-gif-3893433"
        })

    }
}