import React, { useEffect, useState } from 'react';
import Cart from '../ Cart/Cart';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    const firstTen =  fakeData.slice(0,50);
    const [products, setProducts] = useState(firstTen);
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key ===key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])

    const handleClick =(product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd=> pd.key===toBeAdded);
        let count =1; 
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key!==toBeAdded);
            newCart=[...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product 
                        key={product.key}
                        product={product} 
                        handleClick={handleClick}
                        showAddToCart={true}
                        >
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"> <button className="main-btn">Order Review </button> </Link>
                </Cart>
            </div>
        </div>
    );
};


export default Shop;