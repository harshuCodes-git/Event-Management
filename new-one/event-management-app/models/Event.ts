import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
