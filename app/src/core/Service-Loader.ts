import { readdirSync, existsSync } from "fs"
import { join } from "path"


// Cache Variables
const Directory = join(__dirname, "../services")

// Initial Loading
if (existsSync(Directory)) {
    readdirSync(Directory).map(fn => {
        if (!fn.endsWith(".js")) return   // Ignore Non-JS Files

        //? Load Module
        const module: any = require(join(Directory, fn))

        //? Return Module
        console.debug(`Loaded Service: ${fn}`)
        return module
    })
}