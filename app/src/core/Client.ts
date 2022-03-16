import { Client } from "discord.js"

//* Create Client
const Bot = new Client({
    "intents": [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_PRESENCES",
    ],
    "partials": [
        "REACTION",
        "USER",
        "MESSAGE",
        "CHANNEL",
        "GUILD_MEMBER"
    ]
})

//* Login Client
Bot.login(process.env.YUNA_TOKEN)
    .then(() => {
        console.debug(`Ready! Logged in as ${Bot.user.tag}`)
    })
    .catch((err) => {
        console.error("Login Failed!", err)
        process.exit(1)
    })

export default Bot