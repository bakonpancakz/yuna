import { ApplicationCommandDataResolvable, ApplicationCommandPermissionData, Interaction } from "discord.js";

declare interface BotCommand {
    structure: ApplicationCommandDataResolvable,
    permissions: ApplicationCommandPermissionData[],
    invokeFunction(int: Interaction): any,
    disabled?: boolean,
}


declare interface SauceNaoResponse {
    header: {
        user_id: string
        account_type: string
        short_limit: string
        long_limit: string
        long_remaining: number
        short_remaining: number
        status: number
        results_requested: number
        index: {
            [key: string]: {
                id: number
                parent_id: number
                results: number
                status: number
            }
        }
        search_depth: string
        minimum_similarity: number
        query_image_display: string
        query_image: string
        results_returned: number
    }
    results: {
        header: {
            similarity: string
            thumbnail: string
            index_id: number
            index_name: string
            dupes: number
            hidden: number
        },
        data: any | {
            ext_urls: string[]
            created_at: string
            tweet_id: string
            twitter_user_id: string
            twitter_user_handle: string
        }
    }[]
}