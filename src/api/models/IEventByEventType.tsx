import { EventType } from './EventTypeEnum';

export default interface IEventByEventType {
  eventType: EventType,
  customerId: string
  timestamp: string,
}