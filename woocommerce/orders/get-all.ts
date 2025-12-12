import { WcOrdersInterface } from "@/types/woocommerce-types/order";
import { getWoocommerceApi } from "../auth";

export interface GetAllWcOrderRequestData {
    page: number,
    per_page: number,
    status?: "pending" | "processing" | "completed" | "on-hold" | "cancelled" | "refunded" | "failed",
}

export async function getAllWcOrders(options: GetAllWcOrderRequestData) {
    return new Promise<WcOrdersInterface[]>(async (resolve, reject) => {
        try {
            console.log("Debug 1")
            const woocommerceApi = await getWoocommerceApi();
            console.log("Debug 2")
            
            const findQuery: {
                [key: string]: string,
            } = {};
            console.log("Debug 3")
            
            for (const [key, value] of Object.entries(options)) {
                if (value) {
                    findQuery[key] = value;
                }
            }
            console.log("Debug 4")
            
            const response = await woocommerceApi.get<WcOrdersInterface[]>('/orders', {
                params: findQuery,
            })

            console.log("Debug 5")

            return resolve(response.data);
        } catch (err) {
            return reject(err);
        }
    })
}