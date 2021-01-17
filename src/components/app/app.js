import React from 'react'
import {WelcomePage, MainPage, CartPage, ContactPage, ItemPage, OrderPage, NotFoundPage, PrivatePolicyPage} from '../pages'
import Footer from '../footer'
import AppHeader from '../app-header'

import Background from './welcome-bg.jpg'
import {Route, Switch} from 'react-router-dom'

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
                <AppHeader/>
                <Switch>
                    <Route path = '/' exact component={WelcomePage}/>
                    <Route path = '/menu' exact component={MainPage}/>
                    <Route path = '/cart' exact component={CartPage}/>
                    <Route path = '/orders' exact component={OrderPage}/>
                    <Route path = '/contact' exact component={ContactPage}/>
                    <Route path = '/contact/policy' component={PrivatePolicyPage} />
                    
                    {/*router with /:id should be last or will be affected all other routes */}
                    <Route path = '/menu/:id' exact component={ItemPage}/>
                    <Route component={NotFoundPage} />
                </Switch>
                <Footer />
        </div>
    )
}

export default App