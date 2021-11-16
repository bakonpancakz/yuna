import Bot from "./Client"
import Loader from "./Interaction-Loader"


Bot.on("interactionCreate", async (anyInt) => {
    if (!anyInt.isApplicationCommand()) return

    //? Get Relevant Command
    const FuncPos = Loader.Functions[anyInt.commandName]
    const Command = Loader.Commands[FuncPos]

    //? Check for undefined
    if (!Command) return anyInt.reply({
        ephemeral: true,
        content: "This command doesn't exist"
    })

    //? Run Command
    Command.invokeFunction(anyInt)

})