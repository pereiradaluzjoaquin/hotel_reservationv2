import "./RoomStatusIndicator.css";

export const RoomStatusIndicator = () => {
  return (
    <div>
      <ul className="room-status-indicator">
        <li className="room-status-indicator-item">
          <div className="room-status-indicator-dot room-status-indicator-available"></div>
          Available
        </li>
        <li className="room-status-indicator-item">
          <div className="room-status-indicator-dot room-status-indicator-occupied"></div>
          Occupied
        </li>
      </ul>
    </div>
  );
};
