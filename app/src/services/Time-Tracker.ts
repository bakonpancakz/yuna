import { Activity, Presence } from "discord.js";
import Bot from "../core/Client";
import Redis from "../core/Redis";

function GetValidActivities(presence: Presence): Activity[] {
    // No Presence Given
    if (!presence) return [];
    // Return activities with Application IDs
    return presence.activities.filter(a => { if (a.applicationId) return a; });
};


Bot.on("presenceUpdate", (oldp, newp) => {
    const oacts = GetValidActivities(oldp);
    const nacts = GetValidActivities(newp);

    //* Exited Application?
    if (oacts.length === 1 && nacts.length === 0) {

        //* References
        const App: Activity = oacts[0];
        const AppId = App.applicationId;
        const UsrId = oldp.member.id;
        const KEY = `${UsrId}:apps:${AppId}`;

        //* Redis Command
        Promise.allSettled([
            Redis.hSet(`apps:titles`, AppId, App.name),                 // Store App Name
            Redis.sAdd(`${UsrId}:apps:list`, AppId),                    // Add App to Play History
            Redis.hSet(                                                 // Store Last Played Timestamp
                KEY, "last_played", new Date().toISOString()
            ),
            Redis.hIncrBy(
                KEY, "time_spent",                                      // Add Time Spent
                Math.floor((Date.now() - App.createdTimestamp) / 1000)
            ),
        ])

        // Debug Info
        console.debug(`Tracked Activity for User: "${UsrId}" on App: "${AppId}"`);
    };

});