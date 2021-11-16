import * as ioredis from 'ioredis'

const Redis = new ioredis(
    process.env.YUNA_REDIS
        ? String(process.env.YUNA_REDIS)
        : "redis://localhost:6379"
)

export default Redis