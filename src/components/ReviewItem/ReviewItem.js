import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.item; 
    
    return (
        <div >
            <h4>{name}</h4>
            <h4> Item Quantity: {quantity} </h4>
            <p> Item Price: {price} </p>
            <br/>
            <button className="main-btn" onClick={()=> props.removeItem(key)}> Remove </button>
        </div>
    );
};

export default ReviewItem;