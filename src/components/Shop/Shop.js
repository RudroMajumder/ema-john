import React, { useEffect, useState } from 'react';
import Cart from '../ Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(()=>{
        fetch('https://evening-brook-43405.herokuapp.com/products?search='+search)
        .then( res => res.json())
        .then( data => setProducts(data))
    },[search])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://evening-brook-43405.herokuapp.com/productByKeys',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(productKeys)
        })
        .then( res => res.json())
        .then( data => setCart(data))
    },[])

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

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
                <input type="text" className="product-search" onBlur={handleSearch}/>
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