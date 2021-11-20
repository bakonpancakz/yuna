import { ApplicationCommandDataResolvable, Guild } from "discord.js"
import { readdirSync, existsSync } from "fs"
import { BotCommand } from "../types"
import { join } from "path"
import Bot from "./Client"

// Cache Variables
const Directory = join(__dirname, "../commands")
const Structures: Array<ApplicationCommandDataResolvable> = []
const Functions: { [key: string]: number } = {}
const Commands: Array<BotCommand> = []

// Initial Load Modules
if (existsSync(Directory)) {
    readdirSync(Directory).map(fn => {
        if (!fn.endsWith(".js")) return   // Ignore Non-JS Files

        //? Load Module
        const module: BotCommand = require(join(Directory, fn))?.AppCommand

        //? Validate Module
        if (module?.disabled) return console.debug(`Skipping Module: ${fn}, it is disabled.`)
        if (!module?.invokeFunction) throw "Missing invokeFunction"
        if (!module?.structure) throw "Missing structure"

        //? Store Module
        Functions[module.structure.name] = Commands.push(module) - 1
        Structures.push(module.structure)

        //? Return Module
        console.debug(`Loaded Module: ${fn}`)
        return module
    })
}


// Set Guild Commands
function LoadCommands(guild: Guild) {

    //* Replace Guild Commands
    guild.commands.set(Structures)
        .then(data => {
            console.debug(`Set Guild Commands: ${guild.id}`)

            //? Set Permissions
            data.map(command => {

                //? Get Relevant Command
                const FuncPos = Functions[command.name]
                const Command = Commands[FuncPos]
                if (!Command) return
                if (Command.permissions.length === 0) return

                //? Set Permissions
                command.permissions.set({ permissions: Command.permissions })
                    .then(() => {
                        console.debug(`Set Guild Command Permission: ${guild.id}-${command.id}`)
                    })


            })

        })
        .catch(err => { console.debug(`Failed to Set Guild Commands: ${guild.id}`, err) })

}

// Event Listeners
Bot.on("guildCreate", LoadCommands)
Bot.on("ready", () => { Bot.guilds.cache.map(LoadCommands) })

export default {
    Directory: Directory,
    Commands: Commands,
    Functions: Functions,
    Structures: Structures
}