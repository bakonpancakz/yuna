import { CommandInteraction, MessageEmbed } from "discord.js";
import { BotCommand, SauceNaoResponse } from "../types";
import axios from "axios";


const ServerError = {
    embeds: [
        new MessageEmbed({
            color: parseInt("ff0050", 16),
            description: ":anger: **Server Error!**"
        })
    ]
}

const NotFound = {
    embeds: [
        new MessageEmbed({
            color: parseInt("ffffff", 16),
            description: ":mag_right: **No Results Found**"
        })
    ]
}


export const AppCommand: BotCommand = {
    permissions: [],
    
    // Disable Command if API KEY is not provided
    disabled: !Boolean(process.env.YUNA_SAUCENAO),

    structure: {
        "name": "saucenao",
        "type": "CHAT_INPUT",
        "description": "🔎 Search for Image Source via SauceNAO",
        "options": [
            {
                "name": "url",
                "type": "STRING",
                "required": true,
                "description": "🔗 Image URL",
            }
        ]
    },

    invokeFunction: async (int: CommandInteraction) => {
        await int.deferReply()

        //? Search Image
        const ImageURL = int.options.getString("url")
        axios.get(`https://saucenao.com/search.php?db=999&output_type=2&numres=1&url=${ImageURL}&api_key=${String(process.env.YUNA_SAUCENAO)}`)
            .then(async (res) => {

                // Send SauceNAO API Request
                const Response: SauceNaoResponse = res.data
                const Result = Response?.results?.[0]
                if (!Result) return int.editReply(NotFound)
                const Header = Result.header
                const Data = Result.data

                // Convert Data Object to String
                const Description = Object.entries(Data).map(f => {
                    return `**${f[0]}**: ${f[1]}`
                }).join("\n")

                // Create Embed
                const Embed = new MessageEmbed({
                    "thumbnail": {
                        "url": Header.thumbnail
                    },
                    "title": Header.index_name,
                    "description": Description,
                    "footer": {
                        "text": `Similarity: ${Header.similarity}%`
                    }
                })

                // Return Reply
                int.editReply({ embeds: [Embed] })

            })

            .catch(async (err) => {
                //! Log Error
                console.error(err?.response?.data)
                int.editReply(ServerError)

            })

    }
}