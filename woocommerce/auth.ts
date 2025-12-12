import { handleCatchBlock } from "@/functions/error-handler";
import axios, { AxiosInstance } from "axios";

export function getWoocommerceApi() {
    return new Promise<AxiosInstance>((resolve, reject) => {
        try {

            const baseURL = process.env.NEXT_PUBLIC_WC_API_URL;
            const consumerKey = process.env.WC_CONSUMER_KEY;
            const consumerSecret = process.env.WC_CONSUMER_SECRET;

            if (!baseURL) {
                throw new Error("Please provide NEXT_PUBLIC_WC_API_URL in .env");
            } else if (!consumerKey || !consumerSecret) {
                throw new Error("Please provide WC_CONSUMER_KEY and WC_CONSUMER_SECRET in .env");
            }

            const WoocommerceAPI = axios.create({
                baseURL: process.env.NEXT_PUBLIC_WC_API_URL,
                auth: {
                    username: consumerKey,
                    password: consumerSecret,
                },
                headers: {
                    "User-Agent": "woocommercemanager/1.0",
                    "Accept": "application/json"
                }
            })

            return resolve(WoocommerceAPI);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}