import { info } from "console"

class TLogger
{
    #name: string
    #names: string[]
    constructor(...names: string[])
    {
        this.#names = names
        this.#name = `\x1b[90m[\x1b[92m${this.#names.join("\x1b[90m][\x1b[92m")}\x1b[90m]`
    }
    #getDate()
    {  
        const date = new Date()
        return `\x1b[90m[\x1b[92m${date.toLocaleString("de")}\x1b[90m]`
    }
    #getInfo()
    {
        return `${this.#getDate()}${this.#name}`
    }
    info(message: string)
    {
        console.info(`${this.#getInfo()}\x1b[90m[\x1b[36mINFO\x1b[90m]\x1b[0m ${message}`)
    }
    warn(message: string)
    {
        console.warn(`${this.#getInfo()}\x1b[90m[\x1b[93mWARN\x1b[90m]\x1b[0m ${message}`)
    }
    error(message: string)
    {
        console.error(`${this.#getInfo()}\x1b[90m[\x1b[91mERROR\x1b[90m]\x1b[0m ${message}`)
    }
    getLogger(...names: string[])
    {
        return new TLogger(...this.#names,...names)
    }
}

export default TLogger