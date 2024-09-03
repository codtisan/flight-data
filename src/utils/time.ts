import * as dayjs from 'dayjs'

export class Time {
    constructor() { }

    public static getCurrentTime(): string {
        const currentTime = dayjs().format()
        return currentTime
    }
}