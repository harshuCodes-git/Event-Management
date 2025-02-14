"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Book,
  Dumbbell,
  Utensils,
} from "lucide-react";

const categoryIcons = {
  Music: <Music className="w-5 h-5" />,
  Education: <Book className="w-5 h-5" />,
  Sports: <Dumbbell className="w-5 h-5" />,
  Food: <Utensils className="w-5 h-5" />,
};

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          {event.icon}
          <span className="text-sm font-semibold">{event.category}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.attendees} attendees</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [events, setEvents] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_SERPAPI_KEY; // Secure API key

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://serpapi.com/search.json?engine=google_events&q=Events in India&hl=en&gl=us&api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.events_results) {
          const fetchedEvents = data.events_results.map((event, index) => ({
            id: index,
            title: event.title || "Untitled Event",
            date: event.date || "Unknown Date",
            time: event.time || "N/A",
            location: event.address || "Unknown Location",
            category: event.category || "General",
            attendees: event.attendees || 0,
            image: event.image || "https://via.placeholder.com/400",
            icon: categoryIcons[event.category] || (
              <Music className="w-5 h-5" />
            ),
          }));
          setEvents(fetchedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, [API_KEY]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-center text-gray-600">Loading events...</p>
          )}
        </div>
      </main>
    </div>
  );
}
