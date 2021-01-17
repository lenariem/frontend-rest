const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    }
}

const menuError = () => {
    return {
        type: 'MENU_ERROR',
    }
}

const ordersLoaded = (orderNew) => {
    return {
        type: 'ORDERS_LOADED',
        payload: orderNew
    }
}

const ordersRequested = () => {
    return {
        type: 'ORDERS_REQUESTED',
    }
}

const ordersError = () => {
    return {
        type: 'ORDERS_ERROR',
    }
}

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}

const deleteLastOrder = () => {
    return {
        type: 'REMOVE_LAST_ORDER',
    }
}

const setFilter = (value) => {
    return {
        type: 'SET_FILTER',
        payload: value
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    ordersLoaded,
    ordersRequested,
    ordersError, 
    addedToCart, 
    deleteFromCart,
    deleteLastOrder,
    setFilter
}
