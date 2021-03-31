import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+productKey)
        .then( res => res.json())
        .then( data => setProduct(data))
    },[productKey])

    return (
        <div>
            <Product product={product}  showAddToCart={false}>
            </Product>
        </div>
    );
};

export default ProductDetail;