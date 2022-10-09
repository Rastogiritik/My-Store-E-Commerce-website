import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination'
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productAction';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams()

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products) 
    const keyword = params.keyword

    // Its is hook of react which run this function
    useEffect(() => {
        if(error){
           return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage));

    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }


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
            {resPerPage < productsCount && (
                <div className="d-flex justify-content-center mt-5">
                <Pagination 
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            )}
            
                </>
            )}
            
        </>
    )
}
export default Home
