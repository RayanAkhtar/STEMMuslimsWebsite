import ical from "node-ical";
import { parse } from "path";

export async function GET() {
  try {
    const icsUrl = process.env.CALENDAR_LINK;
    if (!icsUrl) {
      throw new Error("Environment variable CALENDAR_LINK is not defined.");
    }

    const response = await fetch(icsUrl);
    const icsText = await response.text();

    const parsed = ical.parseICS(icsText);

    // Convert parsed events to array
    console.log(parsed);
    const now = new Date();
    const events = Object.values(parsed)
      .filter(
        (e: any) =>
          e.type === "VEVENT" &&
          e.transparency !== "TRANSPARENT" &&
          e.start &&
          new Date(e.start) > now
      )
      .map((event: any) => ({
        summary: event.summary || "",
        location: event.location || "",
        start: event.start ? event.start.toISOString() : null,
        end: event.end ? event.end.toISOString() : null,
        uid: event.uid,
      }));
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (err) {
    console.error("Error fetching ICS:", err);
    return new Response(JSON.stringify({ error: "Failed to load calendar feed" }), {
      status: 500,
    });
  }
}
