const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0,
    orders: [],
    loadingOrders: true,
    errorOrders: false,
    filterCategory: "all",
}


//need write about every part of state in every case; action will rewrite state every time after calling, if not do this, parts of state will disappear

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'ORDERS_LOADED':
            return {
                ...state,
                orders: action.payload,
                loadingOrders: false,
                errorOrders: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'ORDERS_REQUESTED':
            return {
                ...state,
                orders: state.orders,
                loadingOrders: true,
                errorOrders: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                error: true
            };
        case 'ORDERS_ERROR':
            return {
                ...state,
                orders: state.orders,
                errorOrders: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload
            console.log("state.items" + state.items)
            const itemInd = state.items.findIndex(item => item.id === id)
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === id)
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            } 
            // item was not in cart before
            
            const item = state.menu.find(item => item._id === id)
            if(!item) {
                return state
            }
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item._id,
                qtty: 1
            }
            
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload
            const itemIndex = state.items.findIndex(item => item.id === idx)
            const itemToDelete = state.items.find(item => item.id === idx)
            const count = itemToDelete.qtty
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty']
        
            if(count > 1) {
                const newCount = {
                    ...itemToDelete,
                    qtty: --itemToDelete.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        newCount,
                        ...state.items.slice(itemIndex + 1)
                    ],
                    totalPrice: state.totalPrice - newCount.price
                }
            }

            return {
                ...state, 
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1),
                ], 
                
                totalPrice: state.totalPrice - price
            };

        case 'REMOVE_LAST_ORDER':
                const allOrders = state.orders
                const orderToDelete = allOrders[allOrders.length-1]
                console.log("orderToDelete:" + orderToDelete)
                const filteredOrders = allOrders.filter(i => i !== orderToDelete)

            return {
                ...state, 
                orders: filteredOrders
            };
            
        case 'SET_FILTER': 
            return {
                ...state,
            filterCategory: action.payload
        };
            
        default: 
            return state;
    }
}

export default reducer
