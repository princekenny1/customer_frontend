import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerServices from "../Services/CustomerServices";
import { Link } from "react-router-dom";


const CustomerList = () => {

const [customers, setCustomers] = useState([]);
useEffect(() => {
  init()
},[])
const init = () => {
  CustomerServices.getAll()
    .then(response => {
      console.log("printing the customers data",response.data);
      setCustomers(response.data);
    })
    .catch(error => {
      console.long("something went wrong",error);
    })
}
const deletHandler = id =>{
  CustomerServices.remove(id)
      .then(response =>{
          console.log("the employee was successfully deleted!",response.data);
          init();
      })
      .catch(error =>{
          console.log("something went wrong!!",error);
      });
 }
  return (  
    
    <div className="container">
      <h3>List Of Registered Customers</h3>
     <hr/>
    <div>
      <Link to="/add" className="btn btn-primary mb-2">Add new Customers +</Link>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
          <th>UserNames</th>
          <th>Emails</th>
          <th>PhoneNumbers</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          customers.map(REGISTERED_CUSTOMERS => (
            <tr key={REGISTERED_CUSTOMERS.id}>
              <td>{REGISTERED_CUSTOMERS.userName}</td>
              <td>{REGISTERED_CUSTOMERS.email}</td>
              <td>{REGISTERED_CUSTOMERS.phoneNumber}</td>
              <td>
                <Link className="btn btn-info mr-4" to={`/customers/edit/${REGISTERED_CUSTOMERS.id}`}>Update</Link>
                <button className="btn btn-danger mr-4" onClick={(e) => {deletHandler(REGISTERED_CUSTOMERS.id)}}>delete</button>
                <Link  className="btn btn-success mb-2" to={`/details/${REGISTERED_CUSTOMERS.id}`}>View</Link>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
    </div>
  );
}
 
export default CustomerList;