import React from "react";

interface EventProps {
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
}

const EventCard: React.FC<EventProps> = ({
  title,
  description,
  location,
  date,
  imageUrl,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p>{description}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm text-gray-500">{new Date(date).toDateString()}</p>
    </div>
  );
};

export default EventCard;
