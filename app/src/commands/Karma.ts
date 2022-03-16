import { CommandInteraction, MessageEmbed } from "discord.js";
import Redis from "../core/Redis";

export default {
    structure: {
        name: "karma",
        type: "CHAT_INPUT",
        description: "🌸 See karma for a specific user",
        options: [{
            name: "user",
            description: "👤 User you are referencing",
            type: "USER"
        }]
    },
    invokeFunction: async (int: CommandInteraction) => {

        //? Get User Info
        const user = int.options.getUser("user") || int.user
        const Upvotes = Number(await Redis.get(`votes:${int.guildId}:${user.id}:upvotes`)) || 0
        const Downvotes = Number(await Redis.get(`votes:${int.guildId}:${user.id}:downvotes`)) || 0

        //? Compile Results
        const Results = new MessageEmbed({
            color: "DARK_GREEN",
            author: {
                icon_url: user.displayAvatarURL(),
                name: user.tag
            },
            description: `This user has accumulated **${Upvotes - Downvotes}** karma!\nOr, more specifically, **${Upvotes}** upvotes and **${Downvotes}** downvotes.`
        })

        //? Return Results
        int.reply({ embeds: [Results] })

    }
} as BotCommand;