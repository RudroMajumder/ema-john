import React, { useState } from 'react';
import Cart from '../ Cart/Cart';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'



const Shop = () => {
    const firstTen =  fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    const [cart,setCart] = useState([]);

    const handleClick =(product) =>{
        console.log('clicked',product);
        const newCart = [...cart,product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product singleProduct={product} handleClick={handleClick}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};


export default Shop;