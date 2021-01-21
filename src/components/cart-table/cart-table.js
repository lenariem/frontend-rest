import React from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {deleteFromCart} from '../../actions'
import WithRestoService from '../hoc'

import './cart-table.scss'

const CartTable = ({items, totalPrice, deleteFromCart, RestoService}) => {
    
    const history = useHistory()
    
    if( items.length === 0){
        return (<div className="cart__title"> Your Cart is empty &#9785; </div>)
    }
    return (
        <>
            <div className="cart__title">Your Order: {totalPrice}$</div>
            <div className="cart__list">
            {
                items.map( item => {
                    const {price, title, url, id, qtty} = item
                    
                    return (
                        <div key = {id} className="cart__item">
                            <img src={url} className="cart__item-img" alt={title}></img>
                            <div className="cart__item-title">{title}</div>
                            <div className="cart__item-price">{price}$ * {qtty}</div>
                            <div onClick = {() => deleteFromCart(id)}className="cart__close">&times;</div>
                        </div>
                    )
                })
            }
            </div>
           
            <button
                className="order"
                onClick={async() => {
                    const genOrders = generateOrder(items)
                    await RestoService.setOrder(genOrders, totalPrice)
                    history.push('/orders') // redirect for functional component
                    window.scrollTo(0, 0)
                }}
            >Make an Order</button>
        </>
    )
}


const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item._id,
            title: item.title,
            qtty: item.qtty,
            date: item.date
        }
    })
    console.log("newOrder:" + newOrder)
    return newOrder
}

const mapStateToProps = ({items, totalPrice}) => {
    return{
        items,
        totalPrice
    }
}

const mapDispatchToProps = {
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable))
