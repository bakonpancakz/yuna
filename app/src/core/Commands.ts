import { Structures, Functions, Commands } from "./Manifest";
import { Guild } from "discord.js";
import Bot from "./Client";

Bot.on("interactionCreate", async (anyInt) => {
    if (!anyInt.isApplicationCommand()) return;

    //* Retrieve Command Data
    const FuncId = Functions[anyInt.commandName];   // Get ID for Command 
    const Command = Commands[FuncId];               // Get Function by ID

    //? Does Command Exist?
    if (!Command) return anyInt.reply({
        ephemeral: true,
        content: "🔎 Command Not Found"
    });

    //? Validate Permission(s) (If any)
    if (Command.memberPermissions)
        if (!anyInt.memberPermissions.has(Command.memberPermissions))
            return anyInt.reply({
                ephemeral: true,
                content: `**✋ You do not have permission to run this command.**`
            });

    //? Run Command
    Command.invokeFunction(anyInt);
})



//? Event Listeners
Bot.once("ready", () => { Bot.guilds.cache.map(WriteCommands) });
Bot.on("guildCreate", WriteCommands);

function WriteCommands(guild: Guild) {

    //* Bulk Overwrite Guild Commands
    Promise.all([
        guild.commands.set(Structures),                             // Bulk overwrite Command(s)
        guild.commands.permissions.set({ fullPermissions: [] }),    // Bulk overwrite Permission(s)
    ])
        .then(() => console.debug(`Updated Guild: ${guild.id}`))
        .catch(e => console.debug(`Updated Guild: ${guild.id}`, e));

};