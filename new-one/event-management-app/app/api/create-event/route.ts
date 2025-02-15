import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export async function POST(req: Request) {
    await connectDB();

    try {
        const { title, description, location, date, imageUrl } = await req.json();
        const newEvent = new Event({ title, description, location, date, imageUrl });
        await newEvent.save();
        return NextResponse.json(newEvent);
    } catch (error) {
        return NextResponse.json({ message: "Error creating event", error });
    }
}
