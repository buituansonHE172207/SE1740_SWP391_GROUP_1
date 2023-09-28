import React, { useState } from "react";
const Header = () => {
    const [formData, setFormData] = useState({
        si_email: "",
        si_password: "",
        su_name: "",
        su_phone: "",
        su_email: "",
        su_password: "",
        su_address: "",
        su_noti: false
    })

    const handleInput = (event) => {
        const {name, value, type, checked} = event.target
        setFormData(prevData => ({
            ...prevData, [name] : type === 'checkbox'? checked : value
        }))
        console.log(formData)

    }
    return (
        <header id="header">
            <div className="header-top medium">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="hdt-social-network">
                                <a href="https://www.facebook.com/is.mycampione/">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://www.facebook.com/is.mycampione/">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://www.facebook.com/is.mycampione/">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="hdt-shortnews">
                                <div className="slide-left">
                                    <i className="fa-solid fa-rss"></i>
                                    <marquee behavior="scroll" direction="left">
                                        Chào mừng bạn đến với BOOKSTORE.COM ^^ Nếu bạn cần giúp đỡ, Hãy liên lạc với chúng tôi qua số hotline: (+84) 123456789 hoặc email: bookstore_cskh@gmail.com
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="hdt-contact text-right">
                                <a href="tel:(+84) 1900561595"><i className="fa fa-phone" aria-hidden="true"></i>  (+84) 123456789</a>
                                <a href="mailto:cskh_online@sachtructuyen.com.vn"><i className="fa fa-envelope" aria-hidden="true"></i>  bookstore_cskh@gmail.com </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="inner desktop-header medium--hide small--hide">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button className="search-btn">
                                    <span className="input-group-text border-0" id="search-addon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </button>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="hd-logo text-center">
                                <a href="/">
                                    <img src="/img/ic_logo_small.png" alt="icon" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="hd-account">
                                <a className="popup_form_user_btn" data-bs-toggle="modal" href="#signinModal">
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    Đăng nhập
                                </a>
                                <a className="popup_form_user_btn2" data-bs-toggle="modal" href="#signupModal">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Đăng kí
                                </a>
                            </div>
                            <div className="wishlist_btn">
                                <div id="onAppWishList_btn_page">
                                    <a>
                                        <i className="fa-regular fa-heart"></i>
                                        <p style={{ fontSize: "16px", display: "block" }} id="onAppWishList_numberLike">0</p>
                                    </a>
                                </div>
                            </div>
                            <div className="desktop-cart-wrapper">
                                <a href="" className="hd-cart">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                    <span className="hd-cart-count">0</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="signinModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <img src="/img/ic_logo_small.png" className="me-3" />
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Đăng nhập</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="email" name="si_email" className="form-control" aria-describedby="emailHelp" placeholder="Email" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="password" name="si_password" className="form-control" placeholder="Mật Khẩu" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <button type="button" className="btn-signin">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="signupModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <img src="/img/ic_logo_small.png" className="me-3" />
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Đăng ký</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="text" name="name" className="form-control" placeholder="Họ tên" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="text" name="su_phone" className="form-control" placeholder="Số điện thoại" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="email" name="su_email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="password" name="su_password" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onClick={handleInput} type="text" name="su_address" className="form-control" placeholder="Địa chỉ" />
                                </div>
                                <div className="form-check">
                                    <input onClick={handleInput} className="form-check-input" name="su_noti" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Nhận thông tin và chương trình khuyến mãi của SACHTRUCTUYEN qua Email
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <button type="button" className="btn-signin">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header