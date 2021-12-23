import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";
import Redis from "../core/Redis";

export const AppCommand: BotCommand = {
    structure: {
        "name": "watchthread",
        "type": "CHAT_INPUT",
        "description": "Prevent Thread from archiving",
        "defaultPermission": false,
        "options": [
            {
                "required": true,
                "name": "channel",
                "type": "CHANNEL",
                "description": "Text Channel to prevent form archiving"
            }
        ]
    },

    permissions: [
        {
            "type": "USER",
            "permission": true,
            "id": String(process.env.YUNA_OWNER)
        }
    ],

    invokeFunction: async (int: CommandInteraction) => {

        //? Get Channel Parameter
        const channel = int.options.getChannel("channel")
        if (!channel) return int.reply({
            ephemeral: true,
            content: "This channel doesn't exist!"
        })

        //? Add thread to set
        console.debug(`Watching Thread: ${channel.id}`)
        Redis.sAdd("yuna:threads", [channel.id])

        //? Return Reply
        int.reply({
            "ephemeral": true,
            "content": "OK! I will prevent this thread from archiving."
        })

    }
}