export function randomItem<Type>(arr: ReadonlyArray<Type> | Array<Type>)
{
    const index = (Math.random() * arr.length) | 0
    return {
        index,
        item: arr[index]
    }
}

export const seconds = (seconds: number) => seconds * 1000
export const minutes = (minutes: number) => minutes * seconds(60)
export const hours = (hours: number) => hours * minutes(60)
export const days = (days: number) => days * hours(24)