"use client";

import { useState } from "react";
import "./RoomReservation.css";
import { Room } from "../models/Room";

type RoomReservationProps = {
  onRoomsReceived: (rooms: Room[], checkIn: string, checkOut: string) => void;
};

export const RoomReservation = ({ onRoomsReceived }: RoomReservationProps) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "Single",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log(formData);
    const response = await fetch(
      `/api/rooms/check?checkIn=${formData.checkIn}&checkOut=${formData.checkOut}&roomType=${formData.roomType}`
    );
    const data = await response.json();
    console.log(data);
    const rooms: Room[] = data.rooms;
    console.log(rooms);
    onRoomsReceived(rooms, formData.checkIn, formData.checkOut);
  };

  return (
    <div>
      <form className="room-reservation-container" onSubmit={handleSubmit}>
        <label htmlFor="checkIn">Check-in Date:</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={formData.checkIn}
          min={todayDate}
          onChange={handleInputChange}
        />

        <label htmlFor="checkOut">Check-out Date:</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={formData.checkOut}
          min={formData.checkIn || todayDate}
          onChange={handleInputChange}
        />
        <label htmlFor="roomType">Room Type:</label>
        <select id="roomType" name="roomType" onChange={handleSelectChange}>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>

        <button type="submit" className="button-reservation">
          Reserve Room
        </button>
      </form>
    </div>
  );
};
