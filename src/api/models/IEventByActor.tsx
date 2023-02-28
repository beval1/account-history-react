import { EventType } from "@testing-library/react"

export default interface IEventByActor {
    actorType: string
    eventType: EventType,
    customerId: string
    timestamp: string,
}