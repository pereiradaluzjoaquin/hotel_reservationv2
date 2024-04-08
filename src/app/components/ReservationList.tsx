"use client";

import { useEffect, useState } from "react";
import { Reservation } from "../models/Reservation";
import "./ReservationList.css";
import { ObjectId } from "mongoose";

const getReservations = async () => {
  const response = await fetch("http://localhost:3000/api/reservations", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error fetching reservations");
  }
  const data = await response.json();
  console.log("data", data);
  return data as Reservation[];
};

export const ReservationList = () => {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const reservations = await getReservations();
      setReservations(reservations);
      setLoading(false);
    };
    fetchReservations();
  }, []);

  const handleDeleteReservation = async (id: ObjectId) => {
    console.log("Delete reservation", id);
    const response = await fetch(
      `http://localhost:3000/api/reservations/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error deleting reservation");
    }
    const data = await response.json();
    console.log("data", data);
    const updatedReservations = reservations.filter(
      (reservation) => reservation._id !== id
    );
    setReservations(updatedReservations);
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.customerId.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      <input
        className="reservation-input-search"
        type="text"
        placeholder="Customer Name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Number</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation._id.toString()}>
              <td>{reservation._id.toString()}</td>
              <td>{reservation.roomId.room_number}</td>
              <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
              <td>{reservation.customerId.name}</td>
              <td>{reservation.customerId.email}</td>
              <td>
                <button
                  onClick={() => handleDeleteReservation(reservation._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
