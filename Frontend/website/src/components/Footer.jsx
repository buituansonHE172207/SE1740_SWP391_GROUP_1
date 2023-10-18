import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
const Footer = () => {
    return (
        <footer id='footer'>
            <div className="ft-social-network">
            </div>
            <div className="ft-content ft-has-no-imgbh">
                <div className='container'>
                    <Row>
                        <Col lg='3'>
                            <div className="ft-nav">
                                <h4>Dịch vụ</h4>
                                <ul className='no-bullet'>
                                    <li>
                                        <Link to='/'>Điều khoản sử dụng</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Chính sách bảo mật</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Liên hệ</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Hệ thống nhà sách</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Tra cứu đơn hàng</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg='3'>
                            <div className="ft-nav">
                                <h4>Hỗ trợ</h4>
                                <ul className='no-bullet'>
                                    <li>
                                        <Link to='/'>Hướng dẫn đặt hàng</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Chính sách đổi trả - hoàn tiền</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Phương thức vận chuyển</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Phương thức thanh toán</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Chính sách khách hàng mua sỉ</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Chính sách khách hàng cho trường học</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg='3'>
                            <div className="ft-nav">
                                <h4>Nhà xuất bản</h4>
                                <div className='ft-contact-desc'>Giám đốc: Nguyễn Văn A</div>
                                <div className='ft-contact-address'>
                                    Địa chỉ: Nguyên Xá 2, Minh Khai, Bắc Từ Liêm, Hà Nội
                                </div>
                                <div className='ft-contact-tel'>
                                    Số điện thoại: (+84) 123454321
                                </div>
                                <div className='ft-contact-email'>
                                    Email: bookstore_cskh@gmail.com
                                </div>
                            </div>
                        </Col>
                        <Col lg='3'>
                            <div className='ft-social-network'>
                                <h4>Kết nối mạng xã hội</h4>
                                <Link to={`/`} target='_blank'>
                                    <i className="fa-brands fa-facebook"></i>
                                </Link>
                                <Link to={`https://www.youtube.com/channel/UCnqGt1p0QZ9gw4-cykvjjSg`} target='_blank'>
                                    <i className="fa-brands fa-youtube" style={{color: '#c4302b'}}></i>
                                </Link>
                                <Link to={`/`} target='_blank'>
                                    <i className="fa-brands fa-instagram" style={{color: '#962fbf'}}></i>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='5'>
                            <div className='ft-contact'>
                                <h4>Giấy phép kinh doanh</h4>
                                <div className='content'>
                                    Giấy phép số: L 517/GP-BTTTT ngày 6/10/2015 của Bộ Thông tin và Truyền thông
                                </div>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className='ft-certification'>
                                <img src="/img/384357041_3446030152377386_696000851305344398_n.png" alt="certi" />
                            </div>
                        </Col>
                        <Col lg='5'>
                            <div className='ft-subscribe'>
                                <h4>Đăng ký nhận tin</h4>
                                <div className='ft-sub-desc'>
                                    Hãy nhập địa chỉ email của bạn vào ô dưới đây để có thể nhận được tất cả các tin tức mới nhất của NXB về các sản phẩm mới, các chương trình khuyến mãi mới. NXB sách mới xin đảm bảo sẽ không gửi mail rác, mail spam tới bạn.
                                </div>
                                <div className='ft-sub-wrapper'>
                                    <div className='input-group'>
                                        <input type="email" name='email' />
                                        <span className='input-group-btn'>
                                            <Button variant='danger' type='submit'>Đăng ký</Button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='ft-copyrights-wrapper'>
                <div className="container">
                    <div className='ft-copyrights text-center'>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer