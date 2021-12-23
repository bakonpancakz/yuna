import { createClient } from "redis"

const Redis = createClient({
    "url": process.env.YUNA_REDIS
        ? String(process.env.YUNA_REDIS)
        : "redis://localhost:6379"
})
Redis.connect()

export default Redis