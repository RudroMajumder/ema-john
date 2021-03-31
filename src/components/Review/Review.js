import React, { useEffect, useState } from 'react';
import Cart from '../ Cart/Cart';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const removeItem = (productKey)=>{
        console.log(productKey+'clicked')
        const newCart = cart.filter( product=> product.key !== productKey )
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
const history = useHistory()
    const handleProceedOrder= () =>{
        history.push('/shipment');
    }

    let placedOrder;
   

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://evening-brook-43405.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, []);

    if(orderPlaced){
        placedOrder = <img src={image} alt=""/>
   }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(item => <ReviewItem
                        Key = {item.key}
                        item={item}
                        removeItem={removeItem}
                        >
                        </ReviewItem>)
                }
                {   placedOrder   }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-btn" onClick={handleProceedOrder}> Proceed Order </button>
                </Cart>
            </div>
        </div>

    );
};

export default Review;