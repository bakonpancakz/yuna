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
        "description": "⏩ See the Rise And Grind for Tommorow",
        "options": [
            {
                "name": "offset",
                "description": "Number of days to offset",
                "type": "NUMBER",
                "required": false
            }
        ]
    },

    invokeFunction: async (int: CommandInteraction) => {

        //* Pull Current Data
        const Offset = int.options.getNumber("offset") || 0
        const Count = Number(await Redis.get("rag:count")) + Offset
        const Quote = await Redis.lRange("rag:quotes", Offset, Offset)
        const Image = await Redis.lRange("rag:images", Offset, Offset)

        //* Create Embed
        const Embed = new MessageEmbed({
            title: `Rise And Grind - Day ${Count}`,
            description: Quote[0],
            color: 16711760,
            image: {
                url: Image[0]
            },
        })

        //* Return Embed
        int.reply({ embeds: [Embed] })

    }
}