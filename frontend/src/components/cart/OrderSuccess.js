import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import  Metadata  from '../layout/MetaData'

const OrderSuccess = () => {
  return (
    <Fragment>
      
        <Metadata title={"Oder Success"} />

        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="https://www.poornima.edu.in/wp-content/uploads/2020/08/greentick.jpg" alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to='/'>Go to Home </Link> 
            </div>

        </div>

    </Fragment>
  )
}

export default OrderSuccess
