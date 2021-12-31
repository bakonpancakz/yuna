## ⏩ Running Locally
### ✋ **Prerequisites**
| Software |       Version       |
| :------: | :-----------------: |
| Node.js  | v16.13.0 or greater |
|  Redis   |  v6.2.0 or greater  |


### ⬇ **Installation Steps**
|       |                             |                                              |
| :---: | :-------------------------: | :------------------------------------------: |
|   1   |  Install App Dependencies   |                   `npm ci`                   |
|   3   | Set Environment Variable(s) | [See Here for Help](#️-environment-variables) |
|   4   |       Start `yuna`        |                 `npm start`                  |
|   5   |    Invite your Test bot     | With scopes `bot` & `applications.commands`  |


## 🏔️ Environment Variables
Use the following below as a template for your `.env` file.

```perl
YUNA_TOKEN="<Discord Bot Token>" # https://discord.com/developers/applications
YUNA_REDIS="<Redis URI>"         # Required for commands, will not run without
YUNA_OWNER="<Discord User ID"    # Your User ID, required for running some commands
YUNA_UPVOTE="🔺"                # Emoji for Upvote
YUNA_DOWNVOTE="🔻"              # Emoji for Downvote
```