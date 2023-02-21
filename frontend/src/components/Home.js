import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
//  import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css';

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productAction";

// // const { createSliderWithTooltip } = Slider.range;
// // const range = createSliderWithTooltip(Slider.range)

// // const Slider = require('rc-slider');
// // const { createSliderWithTooltip } = Slider.createSliderWithTooltip;
// // const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [price, setPrice] = useState([1, 100000])
  const [category, setCategory] = useState("");
  // const [rating, setRating] = useState(0)

  const categories = [
    "Electronics",
    "Cameras",
    "Headphones",
    "WireLess",
    "Mobile",
    "Bluetooth",
    "Microphone",
    "Laptops",
    "Remote",
    "Game",
    "Accessories",
    "Watches",
    "Speaker",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;

  // Its is hook of react which run this function
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, category));
    // dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, keyword, currentPage, category]);
  // }, [dispatch, alert, error, keyword, currentPage, price, category])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Product Online on "} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <hr />

                      <div>
                        <h4>Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}

              {/* {products && products.map(product => (
                                 //  <Product key={product._id} product={product}  />             
                                 <Product key={product._id} product={product} col={3} />
                             ))} */}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Home;
