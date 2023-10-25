import React, {useEffect} from 'react'
import Sidebar from './Sidebar'
import { Row, Container, Col, Breadcrumb } from 'react-bootstrap'
import CheckoutInfo from './CheckoutInfo'
const Checkout = ({cart, setCart, cartChange, setCartChange, cookies}) => {
    
    return (
        <div className='content'>
            {!cookies.authToken && (window.location.href = '/login')}
            {cart?.orderDetails?.length === 0 && (window.location.href = '/cart')}
            <Container className='wrap mb-5'>
                <CheckoutInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange}/>
                <Sidebar cart={cart}/>
            </Container>
        </div>
    )
}

export default Checkout