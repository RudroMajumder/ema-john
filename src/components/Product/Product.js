import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';




const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div  className="product-image">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p> by {seller} </p>
                <h4 style={{color:'black'}}> ${price} </h4>
                <h4 style={{color:'black'}}> Only {stock} left in stock,order soon</h4>
                { props.showAddToCart && <button className="main-btn" onClick={()=> props.handleClick(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <big>  Add to cart</big>
                </button>
                }
            </div>
        </div>
    );
};

export default Product;