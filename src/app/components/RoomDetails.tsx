"use client";

import { useState } from "react";
import { Room } from "../models/Room";
import "./RoomDetails.css";
import { Customer } from "../models/Customer";

type RoomDetailsProps = {
  room: Room;
  checkIn: string;
  checkOut: string;
  onClosed: () => void;
};

export const RoomDetails = ({
  room,
  checkIn,
  checkOut,
  onClosed,
}: RoomDetailsProps) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const responseCustomer = await fetch(
      "http://localhost:3000/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log("reponse customer", responseCustomer);
    const data = await responseCustomer.json();
    console.log("data", data);
    const customer = data.customer as Customer;
    console.log("customer", customer);
    const responseReservation = await fetch(
      "http://localhost:3000/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkIn,
          checkOut,
          roomId: room._id,
          customerId: customer._id,
        }),
      }
    );
    console.log("response reservation", responseReservation);
    const dataReservation = await responseReservation.json();
    console.log("data reservation", dataReservation);
    onClosed();
  };

  return (
    <div className="room-details-modal">
      <div className="room-details-container">
        <h1>Room Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="room-details-info">
            <div className="room-details-item">
              <label htmlFor="check-in">CheckIn</label>
              <input
                type="date"
                id="check-in"
                name="checkIn"
                value={checkIn}
                onChange={handleChange}
                readOnly
              />
              <label htmlFor="check-out">CheckOut</label>
              <input
                type="date"
                id="check-out"
                name="checkOut"
                value={checkOut}
                onChange={handleChange}
                readOnly
              />
              <label htmlFor="room-number">Room Number</label>
              <input
                type="text"
                id="room-number"
                name="roomNumber"
                value={room.room_number}
                readOnly
              />
              <label htmlFor="room-type">Room Type</label>
              <input
                type="text"
                id="room-type"
                name="roomType"
                value={room.room_type}
                readOnly
              />
              <label htmlFor="price">Price per night</label>
              <input
                type="text"
                id="price"
                name="price"
                value={room.price_per_night}
                readOnly
              />
            </div>
            <div className="room-details-item">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="room-details-buttons">
            <button
              className="room-details-button button-cancel"
              onClick={() => onClosed()}
              type="button"
            >
              Close
            </button>
            <button
              className="room-details-button button-reserve"
              type="submit"
            >
              Reserve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
