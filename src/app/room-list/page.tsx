import { RoomList } from "../components/RoomList";
import { Room } from "../models/Room";
import "./page.css";

const getAllRooms = async () => {
  const response = await fetch("http://localhost:3000/api/rooms");
  console.log("response", response);
  if (!response.ok) {
    throw new Error("Error fetching rooms");
  }
  const data = await response.json();
  console.log("data", data);
  const { roomWithNoStatus } = data;
  console.log("roomWithNoStatus", roomWithNoStatus);
  return roomWithNoStatus as Room[];
};

const List = async () => {
  const rooms = await getAllRooms();
  console.log("rooms", rooms);
  return (
    <div className="container">
      <h1 className="room-list-title">Room List</h1>
      <RoomList rooms={rooms} checkIn="" checkOut="" />
    </div>
  );
};
export default List;
