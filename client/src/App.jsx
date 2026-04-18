
import{Navigate, replace} from "react-router-dom"
import{Toaster} from "react-hot-toast"
import { Route,Routes } from "react-router-dom"
import { LoginLanding } from "./pages/LoginLanding"
import { Layout } from "./pages/Layout"
import { Attendence } from "./pages/Attendence"
import { Dashboard } from "./pages/Dashboard"
import { Employee } from "./pages/Employee"
import { Payslips } from "./pages/Payslips"
import { Printpayslips } from "./pages/Printpayslips"
import { Setting } from "./pages/Setting"
import { Leave } from "./pages/Leave"
import { LoginForm } from "./components/LoginForm"

function App() {


  return (
    <>
    <Toaster/>
    <Routes>
  <Route path="/login" element={<LoginLanding/>}/>
   <Route path="/login/admin" element={<LoginForm role="admin" title="adminportal" subtitle
   ="login to mange dashboard"/>}/>
    <Route path="/login/employee" element={<LoginForm role="employee" title="employee portal" subtitle
   ="sign in to access your account"/>}/>


<Route element={<Layout/>}>
<Route path="/leave" element={<Leave/>}/>
 <Route path="/attendance" element={<Attendence/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
 <Route path="/employee" element={<Employee/>}/>
<Route path="/payslips" element={<Payslips/>}/>
 
<Route path="/setting" element={<Setting/>}/>
 </Route>
 <Route path="/print/payslips/:id" element={<Printpayslips/>}/>
   
    <Route path="*" element={<Navigate to="/dashboard"replace/>}/>

   
    </Routes>
    </>
  )
}

export default App
