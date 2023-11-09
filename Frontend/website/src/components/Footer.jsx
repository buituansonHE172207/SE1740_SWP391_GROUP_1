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
                                        <a href='https://nxbkimdong.com.vn/pages/dieu-khoan-dich-vu'>Điều khoản sử dụng</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/chinh-sach-bao-mat'>Chính sách bảo mật</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/lien-he'>Liên hệ</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/he-thong-cua-hang'>Hệ thống nhà sách</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/tra-cuu-don-hang-da-mua'>Tra cứu đơn hàng</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg='3'>
                            <div className="ft-nav">
                                <h4>Hỗ trợ</h4>
                                <ul className='no-bullet'>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/huong-dan-dat-hang'>Hướng dẫn đặt hàng</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/chinh-sach-doi-tra'>Chính sách đổi trả - hoàn tiền</a>
                                    </li>
                                    <li>
                                        <a href='https://nxbkimdong.com.vn/pages/phuong-thuc-van-chuyen'>Phương thức vận chuyển</a>
                                    </li>
                                    <li>
                                        <a href="https://nxbkimdong.com.vn/pages/phuong-thuc-thanh-toan">Phương thức thanh toán</a>
                                    </li>
                                    <li>
                                        <a href="https://nxbkimdong.com.vn/pages/chinh-sach-khach-hang-mua-si">Chính sách khách hàng mua sỉ</a>
                                    </li>
                                    <li>
                                        <a href = "https://nxbkimdong.com.vn/pages/chinh-sach-khach-hang-mua-cho-truong-hoc" >Chính sách khách hàng cho trường học</a>
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
                                <Link to={`https://www.facebook.com/`} target='_blank'>
                                    <i className="fa-brands fa-facebook"></i>
                                </Link>
                                <Link to={`https://www.youtube.com/channel/UCnqGt1p0QZ9gw4-cykvjjSg`} target='_blank'>
                                    <i className="fa-brands fa-youtube" style={{color: '#c4302b'}}></i>
                                </Link>
                                <Link to={`https://www.instagram.com/?hl=en`} target='_blank'>
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
                                    Giấy phép số: L 517/GP-BTTTT ngày 16/11/2022 của Bộ Thông tin và Truyền thông
                                </div>
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