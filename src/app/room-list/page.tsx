import { RoomList } from "../components/RoomList";
import { Room } from "../models/Room";
import "./page.css";

const getAllRooms = async () => {
  const response = await fetch("http://localhost:3000/api/rooms");
  if (!response.ok) {
    throw new Error("Error fetching rooms");
  }
  const data = await response.json();
  const { roomWithNoStatus } = data;
  return roomWithNoStatus as Room[];
};

const List = async () => {
  const rooms = await getAllRooms();
  return (
    <div className="container">
      <h1 className="room-list-title">Room List</h1>
      <RoomList rooms={rooms} checkIn="" checkOut="" noDetails={true} />
    </div>
  );
};
export default List;
