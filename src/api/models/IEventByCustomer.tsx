import { EventType } from "@testing-library/react";
import { ActorType } from "./ActorTypeEnum";
import { IEventParameter } from "./IEventParameter";

export interface IEventByCustomer {
  customerId: string,
  accountId: string,
  actorType: ActorType | string,
  eventType: EventType,
  parameters: IEventParameter[],
  timestamp: string,
}