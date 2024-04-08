import Link from "next/link";
import "./NavBar.css";

export const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li className="nav-item">
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/reservation-list" className="nav-link">
            Reservation List
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/room-list" className="nav-link">
            Room List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
