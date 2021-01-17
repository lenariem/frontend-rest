import React, {Component} from 'react'

import './welcome.scss'
import Chefs from './chefs.png'

class Welcome extends Component {

    render() {

        return (
            <div className="welcome">
                <h1 className="welcome__title">Welcome!</h1>
                <p className="welcome__subtitle"><i>We are happy to see you in our restaurant!</i></p>
                <div className="welcome__wrapper">
                    <a href="tel:123456789"><button className="welcome__btn blue">Call us &#9742;</button></a>
                    <a href="/menu"><button className="welcome__btn">Menu</button></a>
                </div>
                <div style={{background: `url(${Chefs}) center center/contain no-repeat`}} className="welcome__img"></div>

            </div>
        )
    }
}


export default Welcome