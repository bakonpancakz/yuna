import { CommandInteraction, MessageEmbed } from "discord.js";
import { BotCommand } from "../types";
import Redis from "../core/Redis";

export const AppCommand: BotCommand = {
    permissions: [
        {
            "type": "USER",
            "permission": true,
            "id": String(process.env.YUNA_OWNER)
        }
    ],
    structure: {
        "name": "riseandgrind",
        "type": "CHAT_INPUT",
        "description": "⏩ See the Rise And Grind for Tommorow"
    },

    invokeFunction: async (int: CommandInteraction) => {

        //* Pull Current Data
        const Count = await Redis.get("rag:count")
        const Quote = await Redis.lRange("rag:quotes", 0, 0)[0]
        const Image = await Redis.lRange("rag:images", 0, 0)[0]

        //* Create Embed
        const Embed = new MessageEmbed({
            title: `Rise And Grind - Day ${Count}`,
            description: Quote,
            color: 16711760,
            image: { url: Image },
        })

        //* Return Embed
        int.reply({ embeds: [Embed] })

    }
}