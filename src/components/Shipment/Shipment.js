import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

  const { register, handleSubmit, watch, errors } = useForm();

  const [shippingData,setShippingData] = useState(null);

  const onSubmit = data => {
    setShippingData(data);
  }

  const handlePaymentSuccess = (paymentId) =>{
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
       products:savedCart,
       shipment:shippingData,
       paymentId,
       orderTime:new Date()
      };

    fetch('https://evening-brook-43405.herokuapp.com/addOrder',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(orderDetails)
    })
    .then( res=> res.json())
    .then(data => {
      if(data){
        alert("ORDER PLACED SUCCESSFULLY")
        processOrder();
      }
    })
  }
  
    return (
      <div className="container-fluid">
        <div  className="row">
          <div style={{display : shippingData ? 'none' : 'block'}} className="col-md-4">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
              <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
              {errors.name && <span className="error">Name is required</span>}
              <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
              {errors.name && <span className="error">Email is required</span>}
              <input name="address" ref={register({ required: true })} />
              {errors.name && <span className="error">Address is required</span>}
              <input name="phone" ref={register({ required: true })} />
              {errors.name && <span className="error">Phone Number is required</span>}
              <input type="submit" />
            </form>
          </div>
          <div style={{display : shippingData ? 'block' : 'none'}} className="col-md-6">
            <h2>payment info</h2>
            <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
          </div>
        </div>
      </div>
    );
}

export default Shipment;