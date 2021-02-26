import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';




const Product = (props) => {
    const {img,name,seller,price,stock} = props.singleProduct;
    return (
        <div className="product">
            <div  className="product-image">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h4>{name}</h4>
                <p> by {seller} </p>
                <h4 style={{color:'black'}}> ${price} </h4>
                <h4 style={{color:'black'}}> Only {stock} left in stock,order soon</h4>
                <button className="main-btn" onClick={()=> props.handleClick(props.singleProduct)}><FontAwesomeIcon icon={faShoppingCart} /><big>  Add to cart</big></button>
            </div>
        </div>
    );
};

export default Product;