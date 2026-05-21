import React from "react";
import{Link, useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar =() =>{
    const navigate = useNavigate();

    const handleLogout =() =>{
        localStorage.removeItem("token");
        navigate("/Login");
    };

    return(
        <nav className="navbar">
            <h2 className="navbar__logo">My CRM</h2>
            <div className="navbar__links">
                <Link to="/">DashBoard</Link>
                <Link to="/leads">Leads</Link>
                <Link to="/NewLead">Add Lead</Link>
                <Link to="/addticket">Raise a Ticket</Link>
                <Link to="/tickets">Raised Tickets</Link>
            </div>
            <button className="navbar__logout" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};
export default Navbar;