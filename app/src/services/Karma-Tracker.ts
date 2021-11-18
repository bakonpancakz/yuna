import Bot from "../core/Client";
import Redis from "../core/Redis";

const UPVOTE = process.env.YUNA_UPVOTE ? String(process.env.YUNA_UPVOTE) : "🔺"
const DOWNVOTE = process.env.YUNA_DOWNVOTE ? String(process.env.YUNA_DOWNVOTE) : "🔻"

Bot.on("messageCreate", async (message) => {
    if (message.author.bot) return                                       // Ignore Bots
    if (!message.guild.me.permissions.has("ADD_REACTIONS", true)) return // Check Permissions

    //? Check for Media
    if (
        message.attachments.size > 0 || // Check for Attachments
        message.embeds.length > 0       // Check for Embeds (Created by Twitter, Tenor, etc.)
    ) {

        //? Add Reactions
        // Ignore all Error(s)
        Promise.allSettled([
            message.react(UPVOTE),
            message.react(DOWNVOTE),
        ])

    }
})

Bot.on("messageReactionAdd", async (reaction, user) => {
    const message = await reaction.message.fetch()
    await reaction.users.fetch()
    await user.fetch()

    // Ignore Cases
    if (user.bot) return                        // Ignore Bots
    if (user.id === message.author.id) return   // Ignore Self
    if (!reaction.users.cache.has(Bot.user.id)) return // Ignore if Bot hasn't reacted

    //* Update Karma Count
    switch (reaction.emoji.name) {
        case UPVOTE:
            Redis.incr(`votes:${message.guild.id}:${message.author.id}:upvotes`)
            break

        case DOWNVOTE:
            Redis.incr(`votes:${message.guild.id}:${message.author.id}:downvotes`)
            break
    }

})

Bot.on("messageReactionRemove", async (reaction, user) => {
    const message = await reaction.message.fetch()
    await reaction.users.fetch()
    await user.fetch()

    // Ignore Cases
    if (user.bot) return                        // Ignore Bot
    if (user.id === message.author.id) return   // Ignore Self
    if (!reaction.users.cache.has(Bot.user.id)) return // Ignore if Bot hasn't reacted

    //* Update Karma Count
    switch (reaction.emoji.name) {
        case UPVOTE:
            Redis.decr(`votes:${message.guild.id}:${message.author.id}:upvotes`)
            break

        case DOWNVOTE:
            Redis.decr(`votes:${message.guild.id}:${message.author.id}:downvotes`)
            break
    }

})