import { NextResponse } from "next/server";
import { fetchAndStorePrayerTimes } from "@/lib/prayerTimes";

export async function GET() {
    try {
        await fetchAndStorePrayerTimes();
        return NextResponse.json({ message: "Prayer times updated" , success: true });
    } catch (error) {
        console.error('Error updating prayer times:', error);
        return NextResponse.json({ message: "Error updating prayer times", success: false, status: 500 });
    }
}