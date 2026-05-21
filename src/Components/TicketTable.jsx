import React from "react";
import { useEffect, useState } from "react";
import "./TicketTable.css";
import API_URL from "../config";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTickets(data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const search = searchTerm.toLowerCase();
    return (
      ticket.subject?.toLowerCase().includes(search) ||
      ticket.service?.toLowerCase().includes(search) ||
      ticket.department?.toLowerCase().includes(search) ||
      ticket.domain?.toLowerCase().includes(search) ||
      ticket.problem?.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirst, indexOfLast);

  if (loading) return <p className="ticket-table_loading">Loading tickets...</p>;

  return (
    <div className="ticket-table_container">
      <h3 className="ticket-table_title">🎫 Ticket List</h3>

      <div className="ticket-table_search">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Service</th>
            <th>Department</th>
            <th>Domain</th>
            <th>Problem</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.subject}</td>
                <td>{ticket.service || "—"}</td>
                <td>{ticket.department || "—"}</td>
                <td>{ticket.domain || "—"}</td>
                <td>{ticket.problem || "—"}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="ticket-table_empty">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TicketTable;