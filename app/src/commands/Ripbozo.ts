import { CommandInteraction, MessageAttachment } from "discord.js";
import { BotCommand } from "../types";
import { readFileSync } from "fs";
import { join } from "path";

//* Load Image into Memory
const Image = new MessageAttachment(
    readFileSync(
        // Get Image from images directory as typescript
        // doesn't copy images directory to build
        join(__dirname, "../../images/ripbozo.gif"),
    ),
    "ripbozo.gif"
)

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "ripbozo",
        "type": "CHAT_INPUT",
        "description": "😂 RIP BOZO L"
    },

    invokeFunction: async (int: CommandInteraction) => {

        //* Return RIPBOZO GIF
        await int.deferReply()  // Deferred Incase Upload is Slow
        int.editReply({ "files": [Image] })
    }
}