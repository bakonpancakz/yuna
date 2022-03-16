import Bot from "../core/Client"

Bot.on("ready", SetRandomStatus)
function SetRandomStatus() {

    //? Get Track from Beginning and push to back
    const Track = Tracks[0]
    Tracks = Tracks.slice(1)
    Tracks.push(Track)

    //? Set Bot Status
    Bot.user.setPresence({
        "activities": [{
            "type": "LISTENING",
            "name": Track.name
        }]
    })

    //? Change on Timeout
    console.debug(`Set Status to "${Track.name}", Next Track is "${Tracks[0].name}", Waiting for ${Track.time / 1000} seconds.`)
    setTimeout(SetRandomStatus, Track.time);
}

let Tracks = [
    { name: "POWER", time: 292000 },
    { name: "All Of The Lights", time: 299000 },
    { name: "Good Morning", time: 195000 },
    { name: "Stronger", time: 311000 },
    { name: "I Wonder", time: 243000 },
    { name: "Flashing Lights", time: 237000 },
    { name: "Homecoming", time: 203000 },
    { name: "Big Brother", time: 287000 },
    { name: "Heartless", time: 211000 },
    { name: "Touch The Sky", time: 236000 },
    { name: "Gold Digger", time: 207000 },
    { name: "Moon", time: 156000 },
    { name: "Off The Grid", time: 339000 },
    { name: "Jail", time: 297000 },
    { name: "Praise God", time: 226000 },
    { name: "God Breathed", time: 333000 },
    { name: "Lord I Need You", time: 162000 },
    { name: "Donda", time: 128000 },
    { name: "Keep My Spirit Alive", time: 221000 },
    { name: "Heaven and Hell", time: 145000 },
    { name: "Father Stretch My Hands", time: 135000 },
    { name: "No More Parties In LA", time: 374000 },
    { name: "Black Skinhead", time: 188000 },
    { name: "I Am A God", time: 231000 },
    { name: "Hold My Liquor", time: 326000 },
    { name: "Blood On The Leaves", time: 359000 },
    { name: "No Church In The Wild", time: 272000 },
    { name: "Fellas In Paris", time: 219000 }
]