import { Structures, Functions, Commands } from "./Manifest";
import { Guild, GuildApplicationCommandPermissionData } from "discord.js";
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
    guild.commands.set(Structures)
        .then(async (commands) => {
            //* Overwrite Command Permissions
            const Permissions: GuildApplicationCommandPermissionData[] =
                commands.map(c => { return { "id": c.id, "permissions": [] } });
            await guild.commands.permissions.set({ fullPermissions: Permissions });
        })
        .then(() => console.debug(`Updated Guild: ${guild.id}`))
        .catch(e => console.debug(`Updated Guild: ${guild.id}`, e));
};