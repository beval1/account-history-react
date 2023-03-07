import { EventType } from "./EventTypeEnum"

export type IEventCount = {
    eventType: EventType,
    count: number,
}
export default interface IEventByActor {
    actor: string
    countPerEvent: IEventCount[],
}