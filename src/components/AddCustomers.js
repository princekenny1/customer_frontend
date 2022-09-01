import { useEffect, useState } from "react";   
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerServices from "../Services/CustomerServices";

const AddCustomers = () => {

    const [userName,setuserName] = useState('');
    const [email,setemail] = useState('');
    const [phoneNumber,setphoneNumber] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    
    const saveCustomers = (e) => {
        e.preventDefault();

        const customer = {userName,email,phoneNumber,id};
        
        if(id){
            CustomerServices.update(customer)
            
            .then(response => {
                console.log("customer successfully updated",response.data);
                navigate("/");
            })
            .catch(error=>{
                console.log("something went wrong",error);
            });
        }
        else{
            CustomerServices.create(customer)
            .then(response => {

                console.log('customer added successfully!!',response.data);
                navigate("/");
            })
            .catch(error => {
                console.log("something went wrong!!",error);
            });
        }
    }

   useEffect(() =>{
        if(id){
            CustomerServices.get(id)
                .then (REGISTERED_CUSTOMERS => {
                    setuserName(REGISTERED_CUSTOMERS.data.userName);
                    setemail(REGISTERED_CUSTOMERS.data.email);
                    setphoneNumber(REGISTERED_CUSTOMERS.data.phoneNumber);
                })
                .catch(error => {
                    console.log("something went wrong!", error);
                });
        }
   }, [])
   
    return (  
        <div className="container">
            <h3>Add a new customer</h3>
            <hr/>
            <div className="form-content-right">
            <form>
                <h4>Please enter a new customer</h4>
                <div className="form-group">
                    <input type="text" className="form-control col-4" id="userName" 
                    value={userName} onChange={(e) => setuserName(e.target.value)} placeholder="please enter the usernames..."/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control col-4" id="email" 
                    value={email} onChange={(e) => setemail(e.target.value)} placeholder="please enter the email..."/>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control col-4" id="phoneNumber" 
                    value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} placeholder="please enter the Phone number..."/>
                </div>
                <div className="form-group">
                    <button className="btn btn btn-success mr-1"  
                    onClick={(e) => saveCustomers(e)}>Add customer +</button>
                </div>
            </form>
            </div>
            <hr/>
            <Link to="/">Back to home.</Link>
        </div>
    );
}
 
export default AddCustomers;