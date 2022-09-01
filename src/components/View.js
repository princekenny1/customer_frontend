import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomerServices from "../Services/CustomerServices";

const Customerdetails = () => {

    const [userName,setuserName] = useState('');
    const [email,setemail] = useState('');
    const [phoneNumber,setphoneNumber] = useState('');
    const {id} = useParams();
    
    const saveCustomers = (e) => {
        e.preventDefault();

        const customer = {userName,email,phoneNumber,id};
        
        if(id){
            CustomerServices.get(customer)
            
            .then(response => {
                console.log("customer details",response.data);
                
            })
            .catch(error=>{
                console.log("something went wrong",error);
            });
        }
        else{
            console.log("This customer does not exist!!");
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
        <div>
            <h3 className="p-3 mb-2 bg-success text-white">Customer Registration System</h3>
            <br></br>
            <hr/>
               <div className="card-center">
                <div className="card-header">
                    <h3 className="text-center">View customer details</h3>
                </div>
                <div className="card-body ml-4">
                
                <div className="row">
                    <label className="card-subtitle mb-3 text-center ml-4">Customer's Id:</label>
                    <div className="card-subtitle mb-3 text-secondary ml-2 ">{id}</div>
                </div>

                <div className="row">
                    <label className="card-subtitle mb-3 text-center ml-4">Customer's username:</label>
                    <div className="card-subtitle mb-3 text-secondary ml-2 ">{userName}</div>
                </div>
                <div className="row">
                    <label className="card-subtitle mb-3 text-center ml-4">Customer's email:</label>
                    <div className="card-subtitle mb-3 text-secondary ml-2">{email}</div>
                </div>
                <div className="row">
                    <label className="card-subtitle mb-3 text-center ml-4">Customer's phoneNumber:</label>
                    <div className="card-subtitle mb-3 text-secondary ml-2">{phoneNumber}</div>
                </div>
                </div>
                </div>
            <div className="text-center">
            <Link to={"/"} className="text-primary">Back to home</Link>
            </div>
        </div>
    );
}
 
export default Customerdetails;