import React from 'react'
import Breadscrumb from '../Breadscrumb'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useState, useEffect } from 'react'
import { getOrderByUserId } from '../../services/OrderService'
import Orders from './Orders'
import Button from 'react-bootstrap/esm/Button'
const Profile = ({cart, cookies}) => {
  
  const [orders, setOrders] = useState([])

  useEffect(() => {
    cart?.user?.id && getOrderByUserId(cart?.user?.id).then(res => {
      setOrders(res?.data)
    })
  }, [cart?.user?.id])

  return (
    <div>
      {!cookies.authToken && (window.location.href = '/login')}
      <Breadscrumb label="Account" />
      { (
        <div id="PageContainer">
          <div className="main-content">
            <section id="page-wrapper">
              <div className="container">
                <h3>TÀI KHOẢN CỦA BẠN</h3>
                <hr className="hr--small" />
                <Row>
                  <Col md={10}>
                    <h4>Lịch sử giao dịch</h4>
                    {orders?.length !== 0 ? <Orders orders={orders} /> : <p>Bạn chưa có đơn hàng nào</p>}
                  </Col>
                  <Col md={2} style={{display: 'flex', alignItems: 'center', color: '#333333', textDecoration: 'none'}}>
                    <div>
                      <a style={{color: '#333333', textDecoration: 'none'}} href='/account-detail'><Button style={{marginBottom: '5px'}} variant="dark">Thông tin tài khoản</Button></a>
                      <a style={{color: '#333333', textDecoration: 'none'}} href='/change-password'><Button variant="dark">Đổi mật khẩu</Button></a>
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
          </div>
        </div>
      ) }
    </div>
  );
};

export default Profile