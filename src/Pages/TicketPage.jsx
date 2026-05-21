import react from react;
import Ticket from "../Components/Ticket";

function Ticket({onTicketAdded}){
    const [Subject, setSubject] = useState("");
    const [Service, setService] = useState("");
    const [Department, setDepartment] = useState("");
    const [Domain, setDomain] = useState("");
    const [Problem, setProblem] = useState("");
    const [loading, setLoading] = useState(false);
    
    return(
        <div>
            <Ticket></Ticket>
        </div>
    );
}
export default Ticket;