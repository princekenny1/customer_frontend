import { BrowserRouter,Route, Routes } from "react-router-dom";
import AddCustomers from "./components/AddCustomers";
import CustomerList from "./components/CustomerList";
import NotFound from "./components/NotFound";
import Customerdetails from "./components/View";


function App() {

  return(
    
    <BrowserRouter>
  
      <div>
        <Routes>
         
          <Route exact path="/" element={<CustomerList/>} />
          <Route path="/add" element={<AddCustomers/>} />
          <Route path="/details/:id" element={<Customerdetails/>} />
          <Route path="/customers/edit/:id" element={<AddCustomers/>} />
          <Route path="*" element={<NotFound/>}/>
          
        </Routes>
      </div>
    </BrowserRouter>
    
    
  )

}

export default App;