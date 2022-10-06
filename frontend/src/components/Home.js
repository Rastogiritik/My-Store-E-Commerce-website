import React, { useEffect } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productAction';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, produtsCount } = useSelector(state => state.products) 

    // Its is hook of react which run this function
    useEffect(() => {
        if(error){
           return alert.error(error)
        }
        dispatch(getProducts());

    }, [dispatch, alert, error])

    return (
        <>
            {loading ? <Loader/> : (
                <>
                <MetaData title={'Buy Best Product Online on '} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">

                {products && products.map(product => (
                        
                        <Product key={product._id} product={product} />
                        
                 ))}
                </div>
            </section>
                </>
            )}
            
        </>
    )
}
export default Home
