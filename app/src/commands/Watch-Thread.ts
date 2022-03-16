import { CommandInteraction } from "discord.js";
import Redis from "../core/Redis";

export default {
    memberPermissions: ["MANAGE_CHANNELS"],

    structure: {
        name: "watchthread",
        type: "CHAT_INPUT",
        description: "Disallow Thread to archive",
        defaultPermission: false,
        options: [{
            required: true,
            name: "channel",
            type: "CHANNEL",
            description: "Text Channel to prevent form archiving"
        }]
    },

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
} as BotCommand;