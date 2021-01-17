import React, {Component} from 'react'
import MenuListItem from '../menu-list-item'
import { connect } from 'react-redux'
import WithRestoService from '../hoc'
import {menuLoaded, menuRequested, menuError, addedToCart, setFilter} from '../../actions'
import Spinner from '../spinner'
import Error from '../error'

import './menu-list.scss'

class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequested()

        const {RestoService} = this.props
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError())
    }

    render() {
        let {menuItems, loading, error, addedToCart, setFilter, filterCategory} = this.props;
        if (error){
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }

        if (filterCategory !== "all") {
            menuItems = menuItems.filter(item => item.category === filterCategory)
        }

        const items = menuItems.map(menuItem => {
                return ( <MenuListItem 
                            key = {menuItem._id} 
                            menuItem = {menuItem}
                            onAddToCart = {() => addedToCart(menuItem._id)}
                        />
                )
        })


        
        return (
            <>
                <div className="filter">
                    <label>What do you have appetite for? </label>
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option defaultValue value="all" className="choiceText">---- Choose a category ----</option>
                        <option value="all">all</option>
                        <option value="meat">meat</option>
                        <option value="pizza">pizza</option>
                        <option value="salads">salads</option>
                    </select>
                </div>
                <ul className="menu__list">
                    {items}
                </ul>
            </>
            )
    }
}

const mapStateToProps =  (state) =>{
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
        filterCategory: state.filterCategory
    }
}


const mapDispatchToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    setFilter
}



export default WithRestoService()( connect(mapStateToProps, mapDispatchToProps)(MenuList) )