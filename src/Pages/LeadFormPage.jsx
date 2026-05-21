import react from "react";
import LeadForm from "../Components/LeadForm";




function LeadForm({onLeadAdded}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setstatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  

  return(
    <div>
        <Leadform> </Leadform>
    </div>
  );
}
  export default LeadForm;