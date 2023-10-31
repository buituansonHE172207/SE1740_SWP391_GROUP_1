import React from 'react'
import Breadscrumb from '../Breadscrumb'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useState, useEffect } from 'react'
import { getOrderByUserId } from '../../services/OrderService'
import Orders from './Orders'
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
                  <Col md={8}>
                    <h4>Lịch sử giao dịch</h4>
                    {orders?.length !== 0 ? <Orders orders={orders} /> : <p>Bạn chưa có đơn hàng nào</p>}
                  </Col>
                  <Col md={4}>
                      <a href='/account-detail'>Thông tin tài khoản chi tiết</a>
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