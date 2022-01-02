import { createCanvas, loadImage } from "canvas";
import { CommandInteraction } from "discord.js";
import { BotCommand } from "../types";
import { readFileSync } from "fs";
import { join } from "path";


//* Load Template into Memory
const TemplateImage = loadImage(
    readFileSync(
        // Get Image from images directory as typescript
        // doesn't copy images directory to build
        join(__dirname, "../../images/anotherday.jpg")
    )
)

export const AppCommand: BotCommand = {
    permissions: [],
    structure: {
        "name": "anotherday",
        "type": "CHAT_INPUT",
        "description": "Another day of thanking god for not making me a ___ fan",
        "options": [
            {
                "name": "image",
                "description": "Image URL to use for template",
                "type": "STRING",
                "required": true
            }
        ]
    },
    invokeFunction: async (int: CommandInteraction) => {

        //* Validate URL
        const ImageURL = int.options.getString("image")
        try {
            // Throws Error on Malformed/Bad URL
            new URL(ImageURL)
        } catch (err) {
            //! Return Error
            return int.reply({
                "ephemeral": true,  // Hide Response
                "content": "Given URL is malformed or invalid."
            })
        }

        // Wrap in TryCatch because library might error
        try {
            
            //* Create new canvas
            const canvas = createCanvas(940, 788)
            const ctx = canvas.getContext("2d")

            //* Draw background
            ctx.drawImage(await TemplateImage, 0, 0, 940, 788)

            //* Draw Foreground
            await loadImage(ImageURL)
                .then(i => ctx.drawImage(i, 600, 599, 232, 191))

            //* Return Canvas
            int.reply({
                "files": [
                    canvas.toBuffer("image/jpeg")
                ]
            })

        } catch (err) {

            console.error(err)
            //! Return Runtime Error
            return int.reply({
                "ephemeral": true,
                "content": ":warning: Processing Failed!\n```" + err + "```"
            })
        }

    }
}