"use client";
import { useState } from "react";
import { Room } from "../models/Room";
import "./RoomList.css";
import { RoomDetails } from "./RoomDetails";

type RoomListProps = {
  rooms: Room[];
  checkIn: string;
  checkOut: string;
};

export const RoomList = ({ rooms, checkIn, checkOut }: RoomListProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const onModalClose = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="room-container">
      {rooms.map((room) => (
        <div
          key={room._id as unknown as string}
          className={`room room-${room.status}`}
          onClick={() => {
            setSelectedRoom(room);
          }}
        >
          <h2>{room.room_number}</h2>
          <p>{room.room_type}</p>
          <p>Price: ${room.price_per_night}</p>
        </div>
      ))}
      {selectedRoom && (
        <RoomDetails
          room={selectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          onClosed={onModalClose}
        />
      )}
    </div>
  );
};
