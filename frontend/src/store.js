import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducers, productDetailsReducer, newProductReducer, editProductReducer ,newReviewReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';
import { cartRedcer } from './reducers/cartReduces';
import { newOrderReducer, myOrdersReducers, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducer,
    newPeoduct: newProductReducer,
    product: editProductReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartRedcer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducers,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newReview: newReviewReducer
})

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;