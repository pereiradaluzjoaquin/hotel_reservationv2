"use client";
import "./page.css";
import { RoomList } from "./components/RoomList";
import { RoomReservation } from "./components/RoomReservation";
import { useState } from "react";
import { Room } from "./models/Room";

export default function Home() {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleRoomsReceived = (
    rooms: Room[],
    checkIn: string,
    checkOut: string
  ) => {
    console.log("Rooms received", rooms);
    setAvailableRooms(rooms);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
  };

  return (
    <main className="container">
      <h1>Hotel Room Reservation</h1>
      <p>Book a room today!</p>
      <RoomReservation onRoomsReceived={handleRoomsReceived} />
      {availableRooms.length > 0 && (
        <RoomList
          rooms={availableRooms}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      )}
    </main>
  );
}
