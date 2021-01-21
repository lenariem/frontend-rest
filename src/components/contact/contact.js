import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Delivery from './delivery.png'

import './contact.scss';

class Contact extends Component {

    render() {
        return (   
            <div className="contact">
                <h1 className="contact__title">Contact us</h1> 
                <div className="contact__container">
                    <form action="https://formspree.io/f/xzbkyqre" method="POST" className="contact__form">
                        <input type="hidden" name="_language" value="en" />
                        <input type="hidden" name="_subject" value="Message from RestaurantApp" />
                        
                        <div className="contact__input">
                            <input name="name" id="name" type="text" required maxLength="30"/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                            <div className="contact__input">
                                <input name="email" id="email" type="email" required maxLength="50"/>
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <div className="contact__textarea">
                                <textarea name="text" id="text" required maxLength="300"></textarea>
                                <label htmlFor="text">Your Message</label>
                            </div>
                            <div className="contact__triggers">
                                <button className="contact__btn">Send</button>
                                <div className="contact__policy">
                                    <input required type="checkbox" />
                                    <span>I agree with <Link to={'/contact/policy'} className="contact__pp" target="_blank">private policy</Link></span>
                                </div>
                        </div>      
                    </form> 

                <div className="contact__img">
                    <img src={Delivery} alt="chefs" className="contact__img-chefs"/>
                </div>
            </div>
        </div>
       
        )
    }
}

export default Contact