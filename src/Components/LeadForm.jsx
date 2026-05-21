import React,{useState} from "react";
import "./LeadForm.css";


function LeadForm({onLeadAdded}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setstatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () =>{
    setName("");
    setEmail("");
    setPhone("");
    setstatus("New");
    setNotes("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name.trim()) {
      alert("Name is required.");
      return;
    }
    const payload ={
      name: name.trim(),
      email: email.trim() ||undefined,
      phone: phone.trim() ||undefined,
      status: status || "New",
      notes: notes.trim() || undefined,
    };
    setLoading(true);
    try{
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/leads",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ?{Authorization: `Bearer ${token}`}: {}),
        },
        body:JSON.stringify(payload),
      });

      const data= await res.json();
      if (res.ok) {
        alert("Lead added successfully");
        resetForm();
        if(typeof onLeadAdded === "function")onLeadAdded(data);

      }else{
        //backend error message fallback
        alert(data?.message || "Failed to add lead");
        console.error("Add lead error:", data);
      }
    } catch (err) {
      console.error("Network/ unexpected error adding lead:", err);
      alert("Something went wrong. Please try again.");
    } finally{
      setLoading(false);
    }
  };

  return(
    <form className="lead-form" onSubmit={handleSubmit}>
      <h3 className="lead-form__title">Add Lead</h3>

      <div className="lead-form__row">
        <label className="lead-form__label">Name <span className="required">*</span></label>
        <input className="lead-form__input" 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        required
         />
      </div>

      <div className="lead-form__row">
        <label className="lead-form__label">Email</label>
        <input className="lead-form__input" 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com" />

      </div>

      <div className="lead-form__row">
        <label className="lead-form__label">Phone</label>
         <input className="lead-form__input" 
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="9876543210" />
      </div>

      <div className="lead-form__row">
        <label className="lead-form__label">Status</label>
        <select className="lead-form__select"
           value={status}
            onChange={(e) => setstatus(e.target.value)}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
              <option>Won</option>
       </select>
      </div>

      <div className="lead-form__row">
        <label className="lead-form__label">Notes</label>
         <textarea className="lead-form__textarea" 
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="short note about lead (interest, product, etc.)"
        rows={4} />
      </div>

      <div className="lead-form__actions">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Saving...": "Add Lead"}
        </button>

      </div>
    </form>
  );
}

export default LeadForm;