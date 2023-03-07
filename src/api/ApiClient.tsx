import { IEventByCustomer } from "./models/IEventByCustomer";
import config from "../config";
import { IPage } from "./models/IPage";
import { IEventParameter } from "./models/IEventParameter";
import IEventByEventType from "./models/IEventByEventType";
import { EventType } from "./models/EventTypeEnum";
import IEventByActor, { IEventCount } from "./models/IEventByActor";
import { convertUTCDateToLocalDate } from "../utility";

export type ParametersByCustomer = {
    accountId: number
    actor: string,
    eventType: string,
    startDate: string | undefined,
    endDate: string | undefined,
    pagingState?: string
}

export type ParametersByEvent = {
    startDate: string | undefined,
    endDate: string | undefined,
    pagingState?: string
}

export type ParametersByActor = {
    eventType: EventType,
    startDate: string | undefined,
    endDate: string | undefined,
    pagingState?: string
}


export async function getEventsByCustomer(
    customerId: number | string,
    params: ParametersByCustomer
): Promise<IPage<IEventByCustomer>> {
    let paramsString = parseParams(params);
    let requestUrl = `${config.API_URL}/customer/${customerId}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)
    const data: any = await response.json();
    if (response.status != 200){
        throw Error(data.message)
    }

    data.content.forEach((e: any) => {
        let parameters: IEventParameter[] = [];
        Object.entries(e.parameters).forEach(([k, v]) => parameters.push({parameterName: k.toString(), parameterValue: v}))
        e.parameters = parameters
    })
    console.log(data.content)
    return data;
}

export async function getEventsByEvent(
    eventType: string,
    params: ParametersByEvent
): Promise<IPage<IEventByEventType>> {
    let paramsString = parseParams(params);
    let requestUrl = `${config.API_URL}/type/${eventType}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)
    const data: any = await response.json();
    if (response.status != 200){
        throw Error(data.message)
    }

    console.log(data.content)
    return data;
}

export async function getEventsByActor(
    actor: string,
    params: ParametersByActor
): Promise<IEventByActor> {
    let paramsString = parseParams(params);
    let requestUrl = `${config.API_URL}/actor/${actor}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)
    const data: any = await response.json();
    if (response.status != 200){
        throw Error(data.message)
    }
    
    let countPerEvent: IEventCount[] = [];
    Object.entries(data.countPerEvent).forEach(([k,v]) => countPerEvent.push({eventType: EventType[k as keyof typeof EventType], count: Number(v)}));
    data.countPerEvent = countPerEvent;
    console.log(data)
    return data;
}

function parseParams(params: ParametersByCustomer | ParametersByEvent | ParametersByActor): string {
    let paramsString = "?" + Object.entries(params).filter(([k,v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
    return paramsString == "?" ? "" : paramsString;
}

