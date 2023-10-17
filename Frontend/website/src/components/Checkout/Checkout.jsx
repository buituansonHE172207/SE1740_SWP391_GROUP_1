import React from 'react'
import Sidebar from './Sidebar'
import { Row, Container, Col, Breadcrumb } from 'react-bootstrap'
import CheckoutInfo from './CheckoutInfo'
const Checkout = ({cart, setCart, cartChange, setCartChange}) => {
    return (
        <div className='content'>
            <Container className='wrap'>
                <CheckoutInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange}/>
                <Sidebar cart={cart}/>
            </Container>
        </div>
    )
}

export default Checkout