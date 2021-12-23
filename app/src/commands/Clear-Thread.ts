import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";
import Redis from "../core/Redis";

export const AppCommand: BotCommand = {
    structure: {
        "name": "clearthread",
        "type": "CHAT_INPUT",
        "description": "Allow Thread to archive normally",
        "defaultPermission": false,
        "options": [
            {
                "required": true,
                "name": "channel",
                "type": "CHANNEL",
                "description": "Text Channel to allow archiving"
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

        //? Search for Channel ID
        const ChannelIds = await Redis.sMembers("yuna:threads")
        ChannelIds.forEach(id => {

            //? Remove Channel ID from Set
            if (id === channel.id) {
                Redis.sRem("yuna:threads", id)
                console.debug(`Stopped Watching Thread: ${channel.id}`)

            }

        })

        //? Return Not Found
        int.reply({
            "ephemeral": true,
            "content": "OK! This thread can archive now."
        })

    }

}