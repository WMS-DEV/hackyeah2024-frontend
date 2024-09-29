import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import MapIcon from "../../icons/MapIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import AccountIcon from "../../icons/AccountIcon";
import AddIcon from "../../icons/AddIcon";
import "./Navbar.scss";
import "../Button/Button.scss";

const Navbar = () => {
  const currentPage = useLocation().pathname;
  const navigate = useNavigate();

  const handleNavButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__links--bg" />
        <div className="navbar__links">
          <Button
            to="/home"
            label="Map"
            onClick={() => handleNavButtonClick("/home")}
            isActive={currentPage === "/home"}
          >
            <MapIcon
              className={`nav-button__icon ${
                currentPage === "/home" ? "nav-button__icon--active" : ""
              }`}
            />
          </Button>
          <Button
            to="/create"
            label="Create"
            isActive={currentPage === "/create"}
            onClick={() => handleNavButtonClick("/create")}
          >
            <AddIcon
              className={`nav-button__icon ${
                currentPage === "/create" ? "nav-button__icon--active" : ""
              }`}
            />
          </Button>
          <Button
            to="/calendar"
            label="Calendar"
            isActive={currentPage === "/calendar"}
            onClick={() => handleNavButtonClick("/calendar")}
          >
            <CalendarIcon
              className={`nav-button__icon ${
                currentPage === "/calendar" ? "nav-button__icon--active" : ""
              }`}
            />
          </Button>
          <Button
            to="/profile"
            label="Profile"
            isActive={currentPage === "/profile"}
            onClick={() => handleNavButtonClick("/profile")}
          >
            <AccountIcon
              className={`nav-button__icon ${
                currentPage === "/profile" ? "nav-button__icon--active" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
