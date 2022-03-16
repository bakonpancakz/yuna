import { ApplicationCommandDataResolvable } from "discord.js";
// Import Commands
import ClearThread from "../commands/Clear-Thread";
import WatchThread from "../commands/Watch-Thread";
import AnotherDay from "../commands/AnotherDay";
import Karma from "../commands/Karma";
// Import Services
import "../services/Thread-Watcher";
import "../services/Karma-Tracker";
import "../services/Kanye-Songs";

// Exports
export const Structures: ApplicationCommandDataResolvable[] = [];
export const Functions: { [key: string]: number } = {};
export const Commands: BotCommand[] = [
    ClearThread,
    WatchThread,
    AnotherDay,
    Karma,
];

// Retrieve Structure(s) & Function(s)
Commands.forEach((command: BotCommand, index: number) => {
    const Name = command.structure.name;    // Retrieve Name
    Structures.push(command.structure);     // Store Structure
    Functions[Name] = index;                // Store Function ID
});
