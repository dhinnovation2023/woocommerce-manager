import { handleCatchBlock } from "@/functions/error-handler";
import { GetAllWcOrderRequestData, getAllWcOrders } from "@/woocommerce/orders/get-all";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GetAllWcOrderRequestData;
        const orders = await getAllWcOrders(body);

        return NextResponse.json(orders);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}