/*import { NextResponse } from "next/server";
import axios from "axios";

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function GET() {
    try {
        const response = await axios.get(
            `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}/media`,
            {
                params: {
                    fields: 'id, caption, media_url, timestamp',
                    access_token: INSTAGRAM_ACCESS_TOKEN,
                    limit: 3,
                    order_by: 'timestamp',
                    sort: 'desc'
                }
            }
        );
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching Instagram data:", error);
        return NextResponse.error({error: 'Failed to fetch Instagram data'}, { status: 500 });
    }
}*/
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Hello, World!" });
}
