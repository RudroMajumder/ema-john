import React from 'react';
import "./Product.css";




const Product = (props) => {
    return (
        <div className="product">
            <div  className="product-image">
                <img src={props.singleProduct.img} alt=""/>
            </div>
            <div className="product-details">
                <h4>{props.singleProduct.name}</h4>
                <p> by {props.singleProduct.seller} </p>
                <h4 style={{color:'black'}}> ${props.singleProduct.price} </h4>
                <h4 style={{color:'black'}}> Only {props.singleProduct.stock} left in stock,order soon</h4>
                <button> Add to cart </button>
            </div>
        </div>
    );
};

export default Product;