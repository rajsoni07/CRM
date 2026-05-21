import React from 'react';
import './App.css';
import Dashboard from "./Pages/Dashboard";
import {Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/SignUp';
import LeadTablePage from './Pages/LeadTablePage';
import LeadForm from './Components/LeadForm';
import TicketTablePage from './Pages/TicketTablePage' 


import RequireAuth from './RequireAuth';
import Navbar from './Navbar';
import Ticket from './Components/Ticket';


const ProtectedLayout=({children}) => {
  return(
    <>
    <Navbar/>
      <div className='page-container'>{children}</div>
    </>
  );
};
function App(){
  return(
    <div>
      
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </RequireAuth>
        } />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
  
          <Route path='/leads' element={
            <RequireAuth>
              <ProtectedLayout>
                <LeadTablePage/>
              </ProtectedLayout>
            </RequireAuth>
                }/>
          <Route path='/NewLead' element={
            <RequireAuth>
              <ProtectedLayout>
                <LeadForm/>
              </ProtectedLayout>
            </RequireAuth>
            }/>
             <Route path='/tickets' element={
            <RequireAuth>
              <ProtectedLayout>
                <TicketTablePage/>
              </ProtectedLayout>
            </RequireAuth>
                }/>
            <Route path='/addticket' element={
              <RequireAuth>
                <ProtectedLayout>
                  <Ticket/>
                </ProtectedLayout>
              </RequireAuth>
            }/>
        </Routes>
      
    </div>
  );
};
export default App;