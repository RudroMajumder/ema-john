import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i=0;i<cart.length;i++){
        const product = cart[i];
        total= parseFloat((total+product.price*product.quantity).toFixed(2));
    }
    let shipping = 0;
     if( total > 34.99){
        shipping = 0;
    }
    else if( total > 14.99 ){
        shipping = 9.99;
    }
    else if( total>0){
        shipping = 34.99;
    }
    
    const tax = parseFloat((total*.1).toFixed(2));
   
    return (
        <div className="cart">
            <h1 > Shopping Cart</h1>
            <h2> Items Ordered: {cart.length} </h2>
            <p> <big>Product price:{total} </big> </p>
            <p> <big> Shipping price: {shipping} </big> </p>
            <p> <big> Tax:{tax} </big> </p>
            <p> <big> Total:{parseFloat((total+shipping+tax).toFixed(2))} </big> </p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;