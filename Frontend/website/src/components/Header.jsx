import React from "react";

const Header = () => {
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
                                        Chào mừng bạn đến với SACHTRUCTUYEN. Nếu bạn cần giúp đỡ, hãy liên hệ với chúng tôi qua hotline: (+84) 1900561595 hoặc email: cskh_online@sachtructuyen.com.vn.
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="hdt-contact text-right">
                                <a href="tel:(+84) 1900561595"><i className="fa fa-phone" aria-hidden="true"></i>  (+84) 1900561595</a>
                                <a href="mailto:cskh_online@sachtructuyen.com.vn "><i className="fa fa-envelope" aria-hidden="true"></i>  cskh_online@sachtructuyen.com.vn </a>
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
                                    <img src="./img/ic_logo_small.png" alt="icon" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="hd-account">
                                <a className="popup_form_user_btn">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                Đăng nhập
                                </a>
                                <a className="popup_form_user_btn2">
                                <i className="fa-solid fa-pen-to-square"></i>
                                Đăng kí
                                </a>
                            </div>
                            <div className="wishlist_btn">
                                <div  id="onAppWishList_btn_page">
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
        </header>
    )
}

export default Header