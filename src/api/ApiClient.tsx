import { IEventByCustomer } from "./models/IEventByCustomer";
import config from "../config";
import { IPage } from "./models/IPage";

export async function getEventsByCustomer(
    customerId: number,
    accountId: number | undefined,
    actor: string | undefined,
    eventType: string | undefined,
    startDate: Date | undefined,
    endDate: Date | undefined
): Promise<IEventByCustomer[]> {
    const response = await fetch(`${config.API_URL}/customer/${customerId}`);
    const data: IPage<IEventByCustomer> = await response.json();
    return data.content;
}
