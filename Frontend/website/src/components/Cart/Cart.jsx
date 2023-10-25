import React, { useEffect } from 'react'
import Breadscrumb from '../Breadscrumb'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { updateCartItem } from '../../services/CartService'
const Cart = ({ cart, setCart, cartChange, setCartChange }) => {
    const [tempCart, setTempCart] = useState({});
    useEffect(() => {
        setTempCart(cart);
    }, [cart]);

    const handleItemChange = (e, order_id) => {
        setTempCart(cart => {
            const newCart = { ...cart }
            newCart.orderDetails = newCart.orderDetails.map(item => {
                if (item.id === order_id && parseInt(e.target.value, 10) <= item.book.stock && parseInt(e.target.value, 10) >= 1) {
                    item.amount = parseInt(e.target.value, 10)
                }
                return item
            })
            return newCart
        })
    }

    const deleteCartItemHandler = (order_id) => {
        cart.orderDetails = cart.orderDetails.filter(item => item.id !== order_id)
        updateCartItem(cart).then(res => {
            setCartChange(!cartChange)
        })
    }

    const updateCart = () => {
        updateCartItem(tempCart).then(res => {
            setCartChange(!cartChange)
        })
        window.location.reload()
    }

    const checkout = () => {
        window.location.href = '/checkout'
    }

    return (
        <div>
            <Breadscrumb label='GIỎ HÀNG CỦA BẠN' />
            <div id="PageContainer">
                <main className="main-content">
                    <div id="page-wrapper">
                        <Container>
                            <h3>Giỏ hàng</h3>
                            {cart?.orderDetails?.length === 0 && <h5>Giỏ hàng của bạn trống</h5>}
                            <table className="cart-table full" width={'100%'}>
                                <thead className="cart__row cart__header-labels">
                                    <tr>
                                        <th colSpan={2}>Sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tempCart? tempCart?.orderDetails?.map((item, index) => (
                                            <tr className='cart__row'>
                                                <td>
                                                    <a href={`/products/${item.book.id}`}>
                                                    <img src={item.book.images[0].link} alt={item.book.title} style={{width:'6rem'}} />
                                                    </a>
                                                </td>
                                               <td>
                                                    <a style={{color: '#d51c24', textDecoration: 'none', background: 'transparent'}} className='h5' href={`/products/${item.book.id}`}>
                                                        {item.book.title}
                                                    </a>
                                                    <div className='cart__remove'>
                                                        <i onClick={() => deleteCartItemHandler(item.id)} className="fa-solid fa-trash"></i>
                                                    </div>
                                               </td>
                                               <td>
                                                    <span className='h4'>{item?.salePrice?.toLocaleString()}</span>
                                               </td>
                                               <td>
                                                    <div className='js-qty'>
                                                        <input type="number" onChange={(e) => handleItemChange(e, item.id)} value={item.amount}/>
                                                        
                                                    </div>
                                                    <div className='mt-1'>Kho: {item.book.stock}</div>
                                               </td>
                                               <td>
                                                    <span className='h4 '>
                                                        {(item.salePrice * item.amount).toLocaleString()}
                                                    </span>
                                               </td>
                                            </tr>
                                        )) : (window.location.href = '/login')
                                    }
                                </tbody>
                            </table>
                            <Row>
                                <Col lg={8}>
                                    <label htmlFor="" id="CartSpecialInstructions">
                                        Ghi chú
                                    </label>
                                    <textarea name="note" id="CartSpecialInstructions" className='input-full form-control'></textarea>
                                </Col>
                                <Col lg={4} className='text-right'>
                                    <p>
                                        <span className='cart__subtotal-title'>Tạm tính</span>
                                        <span className='h5 cart__subtotal'>{cart?.orderDetails?.reduce((total, item) => total + item.amount * item.salePrice, 0)?.toLocaleString()}₫</span>
                                    </p>
                                    <button type='button' onClick={updateCart} className='update-cart me-2'>Cập nhật</button>
                                    <button type='button' onClick={checkout} className='update-cart'> Thanh toán</button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Cart