import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'



const Shop = () => {
    console.log(fakeData)
    const firstTen =  fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen)
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product singleProduct={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <h3>cart</h3>
            </div>
        </div>
    );
};


export default Shop;