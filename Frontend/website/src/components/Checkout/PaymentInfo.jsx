import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { addOrder } from '../../services/OrderService';
const PaymentInfo = ({ cart, setCart, cartChange, setCartChange }) => {
    const [paymentMethod, setPaymentMethod] = React.useState('cod')

    const handleOrder = () => {
        if (paymentMethod === 'paypal')
        {
            window.location.href = '/checkout/payment/paypal'
        }
        else if (paymentMethod === 'cod') {
            addOrder(cart).then(res => {
                window.location.href = '/account'
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value)
    }



    return (
        <div className='main'>
            <div className="main-header">
                <a href="/"><h4>Nhà xuất bản sách mới</h4></a>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/cart">
                        Giỏ hàng
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/checkout"
                    >
                        Thông tin vận chuyển
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"

                        aria-current="page"
                    >
                        Phương thức thanh toán
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="main-content mt-3">
                <h5>
                    Phương thức thanh toán
                </h5>
                <div className="content-box">
                    <div className="radio-wrapper content-box-row">
                        <label className='two-page' htmlFor="cod">
                            <div className="radio-input payment-method-checkbox">
                                <input type="radio" id='cod' value="cod" onChange={handlePayment} name='payment-method' className="input-radio" checked={paymentMethod === 'cod'} />
                            </div>
                            <div className="radio-content-input">
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6" alt="" className="main-img" />
                                <div className="content-wrapper">
                                    <span className="radio-label-primary ms-3">
                                        Thanh toán khi giao hàng (COD)
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="radio-wrapper content-box-row">
                        <label className='two-page' htmlFor="paypal">
                            <div className="radio-input payment-method-checkbox">
                                <input type="radio" id='paypal' value="paypal" onChange={handlePayment} name='payment-method' className="input-radio" checked={paymentMethod === 'paypal'} />
                            </div>
                            <div className="radio-content-input">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="" className="main-img" />
                                <div className="content-wrapper">
                                    <span className="radio-label-primary ms-3">
                                        Paypal
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="step-footer mb-2">
                    <a href="/cart" className="step-footer-previous-link">
                        Giỏ hàng
                    </a>
                    <button onClick={handleOrder} className='step-footer-continue-btn '>
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo