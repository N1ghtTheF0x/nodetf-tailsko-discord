import { readFileSync } from "fs";
import { resolve } from "path";

export const CONIFG_PATH = resolve(process.cwd(),"config.json")


function TConfig(): TConfig
{
    return JSON.parse(readFileSync(CONIFG_PATH,"utf-8"))
}

interface TConfig
{
    discord_token: string
    master_guild: string
    master_id: string
    master_bday: TConfig.Birthday
}

namespace TConfig
{
    export interface Birthday
    {
        day: number
        month: number
        year?: number
    }
}

export default TConfig