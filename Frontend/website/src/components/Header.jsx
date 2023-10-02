import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import SelectAddress from "./Home/SelectAddress";
import { createAccount, login } from "../services/UserService";
import { getProvince, getDistrict, getWard } from '../services/CityService'
import Cookies from 'js-cookie'
const Header = () => {
    const authToken = Cookies.get('authToken')
    const [formData, setFormData] = useState({
        si_email: "",
        si_password: "",
        su_name: "",
        su_phone: "",
        su_email: "",
        su_password: "",
        su_address: "",
    })
    const [error, setError] = useState({ formatError: false, emptyError: false, existError: false, loginError: false })
    const [provinces, setProvices] = useState([])
    const [province, setProvince] = useState()
    const [province_name, setProvinceName] = useState()
    const [district, setDistrict] = useState()
    const [districts, setDistricts] = useState([])
    const [district_name, setDistrictName] = useState()
    const [ward, setWard] = useState()
    const [ward_name, setWardName] = useState()
    const [wards, setWards] = useState([])
    const [reset, setReset] = useState(false)

    useEffect(() => {
        setProvinceName(null)
        const fetchProvince = async () => {
            const res = await getProvince()
            setProvices(res?.data)
        }
        fetchProvince()
    }, [])

    useEffect(() => {
        setDistrict(null)
        setDistrictName(null)
        const fetchDistrict = async () => {
            const res = await getDistrict(province)
            setDistricts(res?.data.districts)
        }
        province && fetchDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setWard(null)
        setWardName(null)
        const fetchWard = async () => {
            const res = await getWard(district)
            setWards(res?.data.wards)
        }
        district && fetchWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [district, province])

    const handleInput = (event) => {
        const { name, value, type, checked } = event.target
        setFormData(prevData => ({
            ...prevData, [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSignIn = (event) => {
        event.preventDefault()
        const email_regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
        const password_regex = /[a-zA-Z\d]{6,}$/g
        if (formData.si_email === '' || formData.si_password === '' || !email_regex.test(formData.si_email) || !password_regex.test(formData.si_password)) {
            setError((prevData) => ({ ...prevData, loginError: true }))
            return;
        }
        else {
            setError((prevData) => ({ ...prevData, loginError: false }))
        }
        let account = { email: formData.si_email, password: formData.si_password }
        login(account).then(res => {
            Cookies.set('authToken', res.data.token)
            window.location.reload()
        })
        .catch(err => {
            setError((prevData) => ({ ...prevData, loginError: true }))
        })
    }
    const handleSignUp = (event) => {
        event.preventDefault()
        if (formData.su_name.trim() === '' || formData.su_phone.trim() === '' || formData.su_email === '' || formData.su_password.trim() === '' || formData.su_address.trim() === '' || province_name === null || district_name === null || ward_name === null || province_name == undefined || district_name == undefined || ward_name == undefined) {
            setError((prevData) => ({ ...prevData, emptyError: true }))
            return
        }
        else {
            setError((prevData) => ({ ...prevData, emptyError: false }))
        }
        const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g
        const email_regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
        const password_regex = /[a-zA-Z\d]{6,}$/g
        if (!phone_regex.test(formData.su_phone) || !email_regex.test(formData.su_email) || !password_regex.test(formData.su_password)) {
            setError((prevData) => ({ ...prevData, formatError: true }))
            return
        }
        else {
            setError((prevData) => ({ ...prevData, formatError: false }))
        }
        let account = { fullname: formData.su_name, email: formData.su_email, password: formData.su_password, province: province_name, district: district_name, ward: ward_name, phone: formData.su_phone, address: formData.su_address }
        createAccount(account).then(res => {
            Cookies.set('authToken', res.data.token)
            window.location.reload()
        })
        .catch(err => {
            setError((prevData) => ({ ...prevData, existError: true }))
        })
    }

    const logout = () => {
        Cookies.remove('authToken')
        window.location.reload()
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
                                {
                                    authToken ? (
                                        <>
                                            <Link className="popup_form_user_btn" to={`/account`}>
                                                <i class="fa-solid fa-user"></i>
                                                Tài khoản
                                            </Link>
                                            <a className="popup_form_user_btn2" onClick={logout}>
                                                <i className="fa-solid fa-right-to-bracket"></i>
                                                Đăng xuất
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a className="popup_form_user_btn" data-bs-toggle="modal" href="#signinModal">
                                                <i className="fa-solid fa-right-to-bracket"></i>
                                                Đăng nhập
                                            </a>
                                            <a className="popup_form_user_btn2" data-bs-toggle="modal" href="#signupModal">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                Đăng kí
                                            </a>
                                        </>
                                    )
                                }
                                
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
                        <form onSubmit={handleSignIn}>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <input autoComplete="off" onChange={handleInput} type="email" name="si_email" className="form-control" aria-describedby="emailHelp" placeholder="Email" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onChange={handleInput} type="password" name="si_password" className="form-control" placeholder="Mật Khẩu" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <button className="btn-signin">Đăng nhập</button>
                            </div>
                            <div>
                                {error.loginError && <p className="text-danger">Tài khoản hoặc mật khẩu không đúng</p>}
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
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSignUp}>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <input autoComplete="off" onChange={handleInput} type="text" name="su_name" className="form-control" placeholder="Họ tên" />
                                </div>
                                <div className="form-group mb-3">
                                    <input autoComplete="off" onChange={handleInput} type="text" name="su_phone" className="form-control" placeholder="Số điện thoại" />
                                </div>
                                <div className="form-group mb-3">
                                    <input autoComplete="off" onChange={handleInput} type="text" name="su_email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group mb-3">
                                    <input onChange={handleInput} type="password" name="su_password" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                <div className="form-group mb-3">
                                    <input autoComplete="off" onChange={handleInput} type="text" name="su_address" className="form-control" placeholder="Địa chỉ" />
                                </div>
                                <div className="form-group mb-3">
                                    <Row>
                                        <Col lg={6}>
                                            <SelectAddress reset={reset} options={provinces} value={province} setValue={setProvince} setName={setProvinceName} name='su_province' label={'Tỉnh/Thành phố'} />
                                        </Col>
                                        <Col lg={6}>
                                            <SelectAddress reset={reset} options={districts} value={district} setValue={setDistrict} setName={setDistrictName} name='su_district' label={'Quận/Huyện'} />
                                        </Col>
                                        <Col lg={6}>
                                            <SelectAddress reset={reset} options={wards} value={ward} setValue={setWard} setName={setWardName} label={'Phường/Xã'} name='su_ward' />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <button className="btn-signin">Đăng ký</button>
                            </div>
                            <div>
                                {error.emptyError && <p className="text-danger">Vui lòng điền đầy đủ thông tin</p>}
                                {error.formatError && <p className="text-danger">Vui lòng điền đúng định dạng</p>}
                                {error.existError && <p className="text-danger">Email đã tồn tại</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </header>
    )
}

export default Header