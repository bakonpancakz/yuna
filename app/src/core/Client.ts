import { Client } from "discord.js"

//* Create Client
const Bot = new Client({
    "intents": [
        "GUILDS"
    ]
})

//* Login Client
Bot.login(String(process.env.YUNA_TOKEN))
    .then(() => {
        console.debug(`Ready! Logged in as ${Bot.user.tag}`)
    })
    .catch((err) => {
        console.error("Login Failed!", err)
        process.exit(1)
    })


export default Bot