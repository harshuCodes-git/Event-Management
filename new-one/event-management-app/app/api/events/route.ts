import { NextResponse } from "next/server";
import axios from "axios";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export async function GET() {
    await connectDB();

    try {
        // Fetch from SERPAPI
        const serpapiKey = process.env.SERPAPI_KEY;
        const serpapiURL = `https://serpapi.com/search.json?engine=google_events&q=events+near+me&api_key=${serpapiKey}`;

        const serpapiResponse = await axios.get(serpapiURL);
        const serpapiEvents = serpapiResponse.data.events_results || [];

        // Fetch MongoDB events
        const mongoEvents = await Event.find();

        return NextResponse.json([...serpapiEvents, ...mongoEvents]);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching events", error });
    }
}
