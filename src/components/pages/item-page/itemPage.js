import React, {Component} from 'react'
import { connect } from 'react-redux'
import WithRestoService from '../../hoc'
import Spinner from '../../spinner'
import Error from '../../error'
import NotFoundPage from '../not-found-page'
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../../actions'

import './itemPage.css'

class ItemPage extends Component {

    componentDidMount() {
        if( this.props.menuItems.length === 0){
            this.props.menuRequested()

            const {RestoService} = this.props
            RestoService.getMenuItems()
                .then(res => this.props.menuLoaded(res))
                .catch(error => this.props.menuError(error))
        }
    }

    render() {
        const {loading, error, menuItems} = this.props
        if(error) {
            return (
                <div className = "item_page">
                    <Error/>
                </div>
            )
        }
        if(loading) {
            return (
                <div className = "item_page">
                    <Spinner/>
                </div>
            )
        }
        const item = menuItems.find(el => el._id === this.props.match.params.id)
               
        if (item === undefined) {
            return (
                    <NotFoundPage/>
            )
        }
        
        const{title, url, category, price, _id, descr, allerg} = item
        
        return (
       
            <div className = "item_page">
                <div className="menu__item item_block">
                    <div className="menu__title">{title}</div>
                    <div className="menu__descr">{descr}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__titles_container">
                        <div className="menu__category">Category: <span>{category}</span></div>
                        <div className="menu__warn">Allergy warnings:</div>
                    </div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <button onClick = {()=>this.props.addedToCart(_id)} className="menu__btn">Add to cart</button>
                    <span className = {`menu__allerg_Img ${allerg}`} title={allerg}></span> 
                </div>
            </div>
         
        )
    }
}




const mapStateToProps =  (state) =>{
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}


const mapDispatchToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    menuError,
    addedToCart
}


export default WithRestoService()( connect(mapStateToProps, mapDispatchToProps)(ItemPage) )