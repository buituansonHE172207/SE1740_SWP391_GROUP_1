import React, {useEffect} from 'react'
import Sidebar from './Sidebar'
import { Row, Container, Col, Breadcrumb } from 'react-bootstrap'
import CheckoutInfo from './CheckoutInfo'
const Checkout = ({cart, setCart, cartChange, setCartChange, cookies}) => {
    console.log(cart)
    return (
        <div className='content'>
            {!cookies.authToken && (window.location.href = '/login')}
            <Container className='wrap'>
                <CheckoutInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange}/>
                <Sidebar cart={cart}/>
            </Container>
        </div>
    )
}

export default Checkout