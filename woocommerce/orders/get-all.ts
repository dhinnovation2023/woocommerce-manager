import { WcOrdersInterface } from "@/types/woocommerce-types/order";
import { getWoocommerceApi } from "../auth";

export interface GetAllWcOrderRequestData {
    page: number,
    per_page: number,
    status?: "pending" | "processing" | "completed" | "on-hold" | "cancelled" | "refunded" | "failed",
    search?: string,
}

export async function getAllWcOrders(options: GetAllWcOrderRequestData) {
    return new Promise<WcOrdersInterface[]>(async (resolve, reject) => {
        try {
            const woocommerceApi = await getWoocommerceApi();
            
            const findQuery: {
                [key: string]: string,
            } = {};
            
            for (const [key, value] of Object.entries(options)) {
                if (value) {
                    findQuery[key] = value;
                }
            }
            console.log(findQuery)
            
            const response = await woocommerceApi.get<WcOrdersInterface[]>('/orders', {
                params: findQuery,
            })

            return resolve(response.data);
        } catch (err) {
            return reject(err);
        }
    })
}