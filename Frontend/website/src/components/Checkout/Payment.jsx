import React from 'react';
import PaymentInfo from './PaymentInfo';
import Sidebar from './Sidebar';
import { Container } from 'react-bootstrap';

const Payment = ({ cart, setCart, cartChange, setCartChange, cookies }) => {
 
  return (
    <div className='content'>
      {!cookies?.authToken && (window.location.href = '/login')}
      <Container className='wrap'>
        <PaymentInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange} />
        <Sidebar cart={cart} />
      </Container>
    </div>
  )
}


export default Payment;
