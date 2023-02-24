import { EventType } from "@testing-library/react";
import { ActorType } from "./ActorTypeEnum";

interface IEventParameter {
    parameterName: string,
    parameterValue: any
}

export interface IEventByCustomer {
  customerId: number,
  accountId: number,
  actor: ActorType | string,
  eventType: EventType,
  eventParameters: IEventParameter[],
  eventTimestamp: Date,
}