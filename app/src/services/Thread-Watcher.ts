import Bot from "../core/Client"
import Redis from "../core/Redis"

// Thread Event Listener
Bot.on("threadUpdate", async (oldThread, newThread) => {
    if (!newThread) return

    //? Check List for Matching ChannelId
    const ChannelIds = await Redis.sMembers("yuna:threads")
    ChannelIds.forEach((channelId: string) => {
        if (channelId === newThread.id) {

            //? Unarchive Thread (if Archived)
            if (newThread?.archived) oldThread.setArchived(false)
            console.debug(`Unarchived Channel: ${channelId}`)

        }
    })

})