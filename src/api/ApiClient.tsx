import { IEventByCustomer } from "./models/IEventByCustomer";
import config from "../config";
import { IPage } from "./models/IPage";
import { IEventParameter } from "./models/IEventParameter";
import IEventByEventType from "./models/IEventByEventType";
import { EventType } from "./models/EventTypeEnum";
import IEventByActor from "./models/IEventByActor";

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
    params: ParametersByCustomer | null
): Promise<IPage<IEventByCustomer>> {
    let paramsString = "";
    if (params){
        paramsString = "?" + Object.entries(params).filter(([k,v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
    }
    let requestUrl = `${config.API_URL}/customer/${customerId}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)

    const data: IPage<any> = await response.json();
    data.content.forEach(e => {
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
    let paramsString = "?" + Object.entries(params).filter(([k,v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
    let requestUrl = `${config.API_URL}/type/${eventType}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)

    const data: IPage<any> = await response.json();
    console.log(data.content)
    return data;
}

export async function getEventsByActor(
    actor: string,
    params: ParametersByActor
): Promise<IPage<IEventByActor>> {
    let paramsString = "?" + Object.entries(params).filter(([k,v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
    let requestUrl = `${config.API_URL}/actor/${actor}${paramsString}`;
    const response = await fetch(requestUrl);
    console.log(requestUrl)

    const data: IPage<any> = await response.json();
    console.log(data.content)
    return data;
}

