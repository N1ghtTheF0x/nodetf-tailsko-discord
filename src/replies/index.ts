import { randomItem } from "../utils"

export type Reply = string
export type Replies = ReadonlyArray<Reply>

function getReply(pool: Replies,data: Record<string,any> = {})
{
    var text = ""
    const result = randomItem(pool)
    text = result.item
    for(const [key,value] of Object.entries(data)) text = text.replaceAll(`[[${key}]]`,String(value))
    return text
}

export default getReply