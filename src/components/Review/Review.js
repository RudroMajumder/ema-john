import React, { useEffect, useState } from 'react';
import Cart from '../ Cart/Cart';
import fakeData from '../../fakeData';
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
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key ===key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);

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