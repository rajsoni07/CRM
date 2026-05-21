import React from "react";
import "./LeadTable.css";
import API_URL from "../config";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    notes: "",
  });

  // ✅ Fetch Leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/leads`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setLeads(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleEdit = (lead) => {
    setEditingId(lead._id);
    setEditData({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      status: lead.status || "",
      notes: lead.notes || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      name: "",
      email: "",
      phone: "",
      status: "",
      notes: "",
    });
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Update Lead (FIXED PORT)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/leads/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === editingId ? data : lead
          )
        );

        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Delete Lead (NEW)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/leads/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setLeads((prev) =>
          prev.filter((lead) => lead._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="leads-list">
      <h2>Leads</h2>

      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <table className="leads-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, index) => {
              const isEditing = editingId === lead._id;

              return (
                <tr key={lead._id}>
                  <td>{index + 1}</td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          handleChange("name", e.target.value)
                        }
                      />
                    ) : (
                      lead.name
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editData.email}
                        onChange={(e) =>
                          handleChange("email", e.target.value)
                        }
                      />
                    ) : (
                      lead.email
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editData.phone}
                        onChange={(e) =>
                          handleChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      lead.phone
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          handleChange("status", e.target.value)
                        }
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Lost</option>
                        <option>Won</option>
                      </select>
                    ) : (
                      lead.status
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editData.notes}
                        onChange={(e) =>
                          handleChange("notes", e.target.value)
                        }
                      />
                    ) : (
                      lead.notes
                    )}
                  </td>

                  <td className="actions-cell">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="action-btn save"
                        >
                          Save
                        </button>

                        <button
                          onClick={handleCancel}
                          className="action-btn cancel"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(lead)}
                          className="action-btn edit"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(lead._id)
                          }
                          className="action-btn delete"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadsTable;