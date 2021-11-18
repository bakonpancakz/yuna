## ⏩ Running Locally
### **Required Software**
|  Software  |       Version       |
| :--------: | :-----------------: |
|  Node.js   | v16.13.0 or greater |
| Discord.js | v13.1.0 or greater  |
|   Redis    |  v6.2.0 or greater  |

### **Installation Steps**
|       |                                             |                                             |
| :---: | :-----------------------------------------: | :-----------------------------------------: |
|   1   |              Clone Repository               |        `git clone bakonpancakz/yuna`        |
|   2   |            Install Dependencies             |                  `npm ci`                   |
|   3   | [Set Environment Variables](#⛰-environment) |                  See below                  |
|   4   |                 Start yuna                  |                 `npm start`                 |
|   5   |           Invite your Discord bot           | With scopes `bot` & `applications.commands` |


## 🏔️ Environment
```perl
YUNA_TOKEN="<Discord Bot Token>" # https://discord.com/developers/applications
YUNA_REDIS="<Redis URI>"         # Required for commands, will not run without
YUNA_OWNER="<Discord User ID"    # Your User ID, required for running some commands
YUNA_UPVOTE="🔺"                # Emoji for Upvote
YUNA_DOWNVOTE="🔻"              # Emoji for Downvote
```