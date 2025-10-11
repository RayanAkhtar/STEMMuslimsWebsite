import React from "react";
import Carousel from "./carousel";

type EventItem = {
    id: number;
    title: string;
    date: string;
    description: string;
    poster: string;
};

export default async function Highlights() {
    try {
        // fetching info from api directly instead of going through route.js
        const res = await fetch("https://stem-muslims-backend-production.up.railway.app/api/database", {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch events:", res.status);
            return <Carousel events={[]} />;
        }

        const rawData = await res.json();
        
        if (!Array.isArray(rawData) || rawData.length === 0) {
            console.log("No events data available or invalid format");
            return <Carousel events={[]} />;
        }

        const events: EventItem[] = rawData.map((event: any, index: number) => {
            // Clean up the poster URL if it's from an external source
            let posterUrl = event.poster || "";
            
            // Check if the URL is valid
            const isValidUrl = (url: string) => {
                try {
                    new URL(url);
                    return true;
                } catch (e) {
                    return false;
                }
            };
            
            // Handle different URL scenarios
            if (!posterUrl || posterUrl.trim() === '') {
                posterUrl = "/placeholder-event.jpg";
            } else if (!posterUrl.startsWith('/') && !isValidUrl(posterUrl)) {
                posterUrl = "/placeholder-event.jpg";
            }
            
            return {
                id: index,
                title: event.name || "Untitled Event", 
                date: event.event_date || new Date().toISOString(),
                description: event.event_description || "No description available.",
                poster: posterUrl,
            };
        });

        // passes json data to carousel
        return <Carousel events={events} />;
        
    } catch (error) {
        console.error("Error fetching highlights:", error);
        // Return empty carousel instead of null
        return <Carousel events={[]} />;
    }
}
