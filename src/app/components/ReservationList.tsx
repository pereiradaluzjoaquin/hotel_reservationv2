import { Reservation } from "../models/Reservation";

const getReservations = async () => {
  const response = await fetch("http://localhost:3000/api/reservations");
  if (!response.ok) {
    throw new Error("Error fetching reservations");
  }
  const data = await response.json();
  return data as Reservation[];
};

export const ReservationList = async () => {
  const reservations = await getReservations();

  console.log("reservations", reservations);

  return (
    <div>
      <table>
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
          <tr>
            <td>1</td>
            <td>101</td>
            <td>2021-08-01</td>
            <td>2021-08-05</td>
            <td>John Doe</td>
            <td>asdsa asdasd</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
