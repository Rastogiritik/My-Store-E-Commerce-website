// axios use for geting the data from the backend
import axios from "axios";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// export const getProducts = (keyword='', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
export const getProducts =
    (keyword = '', currentPage = 1, category) =>
        async (dispatch) => {
            try {
                dispatch({ type: ALL_PRODUCTS_REQUEST });

                // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[10000]}&rating[gte]=${rating}`
                let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

                if (category) {
                    // link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[10000]}&category=${category}&rating[gte]=${rating}`
                    link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
                }

                // Sending request to backend
                const { data } = await axios.get(link);

                dispatch({
                    type: ALL_PRODUCTS_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: ALL_PRODUCTS_FAIL,
                    payload: error.response.data.message,
                });
            }
        };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // Sending request to backend
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};