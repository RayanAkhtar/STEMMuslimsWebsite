import { NextResponse } from "next/server";
import { fetchAndStorePrayerTimes } from "@/lib/prayerTimes";

/* Intended to be hit by a scheduler, not the public: callers must present the
   CRON_SECRET bearer token (Vercel cron sends this automatically when the env
   var is set). Unauthenticated calls are rejected rather than spending an
   upstream API request. */
export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return NextResponse.json({ message: "CRON_SECRET is not configured" }, { status: 503 });
    }
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await fetchAndStorePrayerTimes();
        return NextResponse.json({ message: "Prayer times updated", success: true });
    } catch (error) {
        console.error('Error updating prayer times:', error);
        return NextResponse.json({ message: "Error updating prayer times", success: false }, { status: 500 });
    }
}