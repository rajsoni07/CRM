import React, { useState } from "react";
import "./Ticket.css";
import API_URL from "../config";
function Ticket({ onTicketAdded }) {
  const [subject, setSubject] = useState("");
  const [service, setService] = useState("");
  const [department, setDepartment] = useState("");
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSubject("");
    setService("");
    setDepartment("");
    setDomain("");
    setProblem("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim()) {
      alert("Subject is required.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }

    const payload = {
      subject: subject.trim(),
      service: service.trim() || undefined,
      department: department.trim() || undefined,
      domain: domain.trim() || undefined,
      problem: problem.trim() || undefined,
    };

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error("Backend error:", data);
        alert(data.message || "Failed to add ticket");
        return;
      }

      alert("Ticket added successfully!");
      resetForm();

      if (typeof onTicketAdded === "function") {
        onTicketAdded(data);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Server not responding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h3 className="ticket-form_title">Add Ticket</h3>

      {/* Row 1 */}
      <div className="ticket-form_row">
        <div className="ticket-form_group">
          <label className="ticket-form_label">
            Subject <span className="required">*</span>
          </label>
          <input
            className="ticket-form_input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter ticket subject"
            required
          />
        </div>

        <div className="ticket-form_group">
          <label className="ticket-form_label">Service</label>
          <input
            className="ticket-form_input"
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Type of service (e.g. Development)"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="ticket-form_row">
        <div className="ticket-form_group">
          <label className="ticket-form_label">Department</label>
          <input
            className="ticket-form_input"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department name (e.g. Education)"
          />
        </div>

        <div className="ticket-form_group">
          <label className="ticket-form_label">Domain</label>
          <input
            className="ticket-form_input"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Example: 89.89.89.90"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="ticket-form_row">
        <div
          className="ticket-form_group"
          style={{ flex: "1 1 100%" }}
        >
          <label className="ticket-form_label">Problem</label>
          <textarea
            className="ticket-form_textarea"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your issue in detail..."
            rows={4}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="ticket-form_actions">
        <button
          className="ticket-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Ticket"}
        </button>
      </div>
    </form>
  );
}

export default Ticket;