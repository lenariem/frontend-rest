import React, {Component} from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import randomstring from 'randomstring'

import WithRestoService from '../hoc'
import {ordersLoaded, ordersRequested, ordersError} from '../../actions'
import Spinner from '../spinner'
import Error from '../error'

import './order.scss'

class OrderPage extends Component {

    componentDidMount() {
        this.props.ordersRequested()
        const {RestoService} = this.props

        RestoService.getOrdersItems()
            .then(res => this.props.ordersLoaded(res))
            .catch(() => this.props.ordersError())
    }

    render() {
       
        const {ordersItem, loadingOrders, errorOrders} = this.props
        
        if (errorOrders){
            return <Error/>
        }
        if (loadingOrders) {
            return <Spinner/>
        }  
    
    const userOrder = ordersItem.map(item => {
        return ( 
            <div className="orders__wrapper" key={randomstring.generate(7)}> 
                <p>
                    {item.order.map(item=>item.title + " x " + item.qtty + ";  ")}
                </p>
                <br />
                <p><i>Price: <span><b>{item.totalPrice}$</b></span></i></p>
                <p className="orders__date"><i><b>Date: </b></i>{item.date}</p>
            </div>
               
        )
    })

    const lastOrder =  userOrder[userOrder.length - 1]
        
    if(userOrder.length === 0){
        
        return (
            <div className="orders">
                <div className="orders__container empty"> No Orders yet</div>
            </div>
        )
    }

    function handleToken(token, addresses) {
        console.log({token, addresses})
    }
    

    return (
        <div className="orders">
                <h1 className="orders__title">Your Orders</h1>

                <div className="orders__container">
                    <p className="orders__subtitle">Last Order:</p>
                        {lastOrder}

                    <StripeCheckout
                        stripeKey="pk_test_51I6uwuAF7gx84FkWjEsyUvHvq13MGsJeI72xykMkyXyrTLhDxGGRmE7K4r5WLFzyLQZpi9K3dQ8bL7M3JXB8RQ4U00Cjj97Up0"
                        token={handleToken}
                        locale="en"
                        billingAddress
                        shippingAddress
                        bitcoin 
                        >
                        <button className="pay_order_btn">
                        <span>Delivery address and payment</span>
                        </button>
                    </StripeCheckout>
                </div>

                <div className="orders__container">
                    <p className="orders__subtitle">Order's History</p>
                        {userOrder}
                </div>
        </div> 
        )
       
    }
}

const mapStateToProps =  (state) =>{
    return {
        ordersItem: state.orders,
        loading: state.loadingOrders,
        error: state.errorOrders,
        totalPrice: state.totalPrice
    }
}


const mapDispatchToProps = {
    ordersLoaded,
    ordersRequested,
    ordersError
}


export default WithRestoService()( connect(mapStateToProps, mapDispatchToProps)(OrderPage) )