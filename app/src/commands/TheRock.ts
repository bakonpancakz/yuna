import { CommandInteraction, MessageAttachment } from "discord.js";
import { BotCommand } from "../types";
import { readFileSync } from "fs";
import { join } from "path";

//* Load Image into Memory
const Image = new MessageAttachment(
    readFileSync(
        // Get Image from images directory as typescript
        // doesn't copy images directory to build
        join(__dirname, "../../images/therock.gif"),
    ),
    "therock.gif"
)

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "therock",
        "type": "CHAT_INPUT",
        "description": "🤘 The rock is cooking"
    },

    invokeFunction: async (int: CommandInteraction) => {

        //* Return The Rock GIF
        await int.deferReply()  // Deferred Incase Upload is Slow
        int.editReply({ "files": [Image] })
    }
}