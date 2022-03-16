import { createClient } from "redis"

const Redis = createClient({ "url": process.env.YUNA_REDIS });
Redis.on("error", e => {
    // Log Error to Console
    console.error("[REDIS][ERROR]", e);
});

// Connect Database
Redis.connect();
export default Redis