import { CommandInteraction, MessageEmbed } from "discord.js";
import { centerText, toDuration } from "../modules/Timeformat";
import { timeAgo } from "../modules/TimeAgo";
import Redis from "../core/Redis";

interface AppInfo {
    app_id: string;
    app_name: string;
    last_played: Date;
    time_spent: number;
}

export default {

    "structure": {
        name: "activity",
        type: "CHAT_INPUT",
        description: "See your game activity.",
        options: [{
            name: "share",
            type: "BOOLEAN",
            description: "Make message only visible to you?"
        }]
    },

    invokeFunction: async (int: CommandInteraction) => {

        //* [1] Reference
        const User = int.user;
        const UserId = int.user.id;

        //* [1] Retrieve Application Data
        const AppList: string[] = await Redis.sMembers(`${UserId}:apps:list`);

        // Played any games yet?
        if (AppList.length === 0) return int.reply({
            content: "No Game Activity Yet! Please try again later."
        });

        Promise.all(
            AppList.map((id: string) => {
                return new Promise(async (res) => {

                    //* [1] Request Data
                    const Data = await Redis.hGetAll(`${UserId}:apps:${id}`);
                    const Name = await Redis.hGet(`apps:titles`, id);

                    //* [2] Parse Redis Hash
                    res({
                        "app_id": id,
                        "app_name": Name,
                        "last_played": new Date(Data.last_played),
                        "time_spent": parseInt(Data.time_spent),
                    });

                });
            })
        )
            .then(async (AppInfo: AppInfo[]) => {

                // Create New Embed
                const Embed = new MessageEmbed({
                    author: {
                        icon_url: User.avatarURL({ size: 32 }),
                        name: `Game activity for ${User.tag}`
                    },
                    color: 16711771,
                    description: "",
                });

                //* Get Unique Games
                Embed.description += `Unique Games Played: \`${AppInfo.length}\`\n`

                //* Get Total Time
                let TotalTime = 0;
                AppInfo.forEach(a => TotalTime += a.time_spent);
                Embed.description += `Total Game Time: \`${toDuration(TotalTime * 1000)}\`\n`

                //* Compile Games List
                Embed.description += "```diff\n";   // Start Code Block
                AppInfo.every((app, i, a) => {

                    //* [1] Compile Data
                    const LastPlayed = centerText(timeAgo(app.last_played), 15);        // Get Last Played
                    const Duration = toDuration(app.time_spent * 1000);                 // Get Duration
                    const AppName = app.app_name.length > 20                            // Get App Date
                        ? app.app_name.slice(0, 19) + "…"
                        : app.app_name.slice(0, 20).padEnd(20, " ");
                    const str = `${i + 1}. ${AppName} | ${LastPlayed} | ${Duration}`;

                    //* [2] Does Text Fit?
                    if (Embed.description.length + str.length > 4000) {

                        //* No more Room! Notify of missing entry(s)
                        const Remaining = (a.length - 1) - i;
                        Embed.description += `+${Remaining} more…`;
                        return false;
                    } else {

                        //* Append to bottom
                        Embed.description += str;
                        if (i !== a.length) Embed.description += `\n`;
                        return true;
                    };

                })
                Embed.description += "```";         // End Code Block

                //* Return Embed
                int.reply({
                    ephemeral: !int.options.getBoolean("share"),
                    embeds: [Embed]
                });

            })
            .catch((err: Error) => {

                console.error(err)
                //! Return Runtime Error
                return int.reply({
                    "ephemeral": true,
                    "content": ":warning: Processing Failed!\n```" + err + "```"
                });

            });

    }

} as BotCommand;