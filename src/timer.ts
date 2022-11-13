class TTimer
{
    static readonly instance = new this()
    #date: Date = this.#getDate()
    #handle: NodeJS.Timer = this.start()
    #callbacks: TTimer.Callback[] = []
    private constructor(){}
    #getDate()
    {
        return new Date()
    }
    get currentDate() { return this.#date }
    start()
    {
        return setInterval(() => 
        {
            this.#date = this.#getDate()
            this.#callbacks.forEach((c) => c(this.#date))
        })
    }
    addCallback(...cbs: TTimer.Callback[])
    {
        this.#callbacks.push(...cbs)
    }
    stop()
    {
        return clearInterval(this.#handle)
    }
    restart()
    {
        this.stop()
        this.restart()
    }
}

namespace TTimer
{
    export type Callback = (date: Date) => void
}

export default TTimer