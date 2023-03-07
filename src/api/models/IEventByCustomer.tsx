import { EventType } from "@testing-library/react";
import { IEventParameter } from "./IEventParameter";

export interface IEventByCustomer {
  customerId: string,
  accountId: string,
  actor: string,
  eventType: EventType,
  parameters: IEventParameter[],
  timestamp: string,
}