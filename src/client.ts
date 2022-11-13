import { Client, Message } from "discord.js";
import TConfig from "./config";
import { ALL_INTENTS, ALL_PARTIALS } from "./constants";
import TLogger from "./logger";
import getReply, { Replies } from "./replies";
import { BDAY_REPLIES, BDAY_YEAR_REPLIES } from "./replies/bday";
import SANDBOX_REPLIES from "./replies/sandbox";
import TTimer from "./timer";
import { days, hours, minutes } from "./utils";

class TClient
{
    static logger = new TLogger("Discord")
    #discord: Client = new Client({
        intents: ALL_INTENTS,
        partials: ALL_PARTIALS
    })
    config: Readonly<TConfig> = TConfig()
    #ready: boolean = false
    get ready() { return this.#ready}
    constructor()
    {
        this.#discord.on("ready",() => this.#onReady())
        this.#discord.on("messageCreate",(msg) => this.#onMessage(msg))
        TTimer.instance.addCallback((date) => this.#onTimer(date))
    }
    getMasterGuild()
    {
        return this.#discord.guilds.fetch(this.config.master_guild)
    }
    async getMaster()
    {
        return (await this.getMasterGuild()).members.fetch(this.config.master_id)
    }
    #onReady()
    {
        TClient.logger.info("Ready to use!")
        this.#ready = true
    }
    async #onMessage(message: Message)
    {
        TClient.logger.info(`<${message.author.username}> ${message.content}`)
    }
    #sandboxReminded: boolean = false
    #masterBdayReminded: boolean = false
    async #onTimer(date: Date)
    {
        const master = await this.getMaster()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const sandboxHourse = [3,9,15,21]
        if((hour == sandboxHourse[0]-1 || hour == sandboxHourse[1]-1 || hour == sandboxHourse[2]-1 || hour == sandboxHourse[3]-1) && minute == 50 && !this.#sandboxReminded) // S&box Reminder
        {
            this.#sandboxReminded = true
            setTimeout(() => this.#sandboxReminded = false,minutes(1))
            await master.user.send(getReply(SANDBOX_REPLIES,{name: master.user.username}))
        }
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        if((day == this.config.master_bday.day && month == this.config.master_bday.month) && !this.#masterBdayReminded) // Birthday
        {
            this.#masterBdayReminded = true
            setTimeout(() => this.#masterBdayReminded = false,days(1)+hours(1))
            var replies: Replies
            if(this.config.master_bday.year) replies = BDAY_YEAR_REPLIES
            else replies = BDAY_REPLIES
            await master.user.send(getReply(replies,{name: master.user.username,year: year - (this.config.master_bday.year ?? 0)}))
        }
    }
    async login()
    {
        await this.#discord.login(this.config.discord_token)
    }
    destroy()
    {
        this.#discord.destroy()
    }
}

export default TClient