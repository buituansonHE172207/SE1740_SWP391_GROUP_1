import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SelectAddress from '../Home/SelectAddress'
import { getProvince, getDistrict, getWard } from '../../services/CityService'
import { updateCartItem } from '../../services/CartService'
const CheckoutInfo = ({ cart, setCart, cartChange, setCartChange }) => {

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
    const [error, setError] = useState({ formatError: false, emptyError: false, existError: false, loginError: false, passwordError: false, emailError: false, phoneError: false })
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCart(prevCart => ({
            ...prevCart,
            [name]: value
        }))
    }

    const handleToPayment = () => {
        if (!cart.fullName || !cart.phone || !cart.address) {
            setError(prevError => ({
                ...prevError,
                emptyError: true
            }))
            return
        }
        const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g
        if (!phone_regex.test(cart.phone)) {
            setError(prevError => ({
                ...prevError,
                phoneError: true
            }))
            return
        }
        if (province_name && district_name && ward_name) {
            setCart(prevCart => ({
                ...prevCart,
                province: province_name,
                district: district_name,
                ward: ward_name
            }))
        }
        updateCartItem(cart).then(res => {
            setCartChange(!cartChange)
        })
        window.location.href = '/checkout/payment'
    }

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

    return (
        <div className="main">
            <div className="main-header">
                <a href="/"><h4 >Nhà xuất bản sách mới</h4></a>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/cart">
                        Giỏ hàng
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                    >
                        Thông tin vận chuyển
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"

                        aria-current="page"
                    >
                        Phương thức thanh toán
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="main-content">
                <div className="step">
                    <div className="step-sections">
                        <div className="section">
                            <div className="section-header">
                                <h5>Thông tin thanh toán</h5>
                            </div>
                            <div className="section-content section-customer-information no-mb">
                                <div className='mb-3'>
                                    <label for="name" className="form-label">Họ và tên</label>
                                    <input id='name' className='form-control' autoComplete='off' type="text" name='fullName' placeholder='Họ và tên' value={cart.fullName || ''} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label for="phone" className="form-label">Số điện thoại</label>
                                    <input id='phone' type="text" className='form-control' autoComplete='off' name='phone' placeholder='Điện thoại' value={cart.phone || ''} onChange={handleInputChange} />
                                </div>

                                <div className="mb-3">
                                    <label for="address" className="form-label">Địa chỉ</label>
                                    <input type="text" className='form-control' autoComplete='off' name='address' placeholder='Địa chỉ' value={cart.address || ''} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <Row>
                                        <Col lg={4}>
                                            <label htmlFor="select-address">Tỉnh/Thành phố:</label>
                                            <SelectAddress reset={reset} options={provinces} value={province} setValue={setProvince} setName={setProvinceName} name='su_province' label={`${cart.province}`} />
                                        </Col>
                                        <Col lg={4}>
                                            <label htmlFor="select-address">Quận/Huyện:</label>
                                            <SelectAddress reset={reset} options={districts} value={district} setValue={setDistrict} setName={setDistrictName} name='su_district' label={`${cart.district}`} />
                                        </Col>
                                        <Col lg={4}>
                                            <label htmlFor="select-address">Phường/Xã:</label>
                                            <SelectAddress reset={reset} options={wards} value={ward} setValue={setWard} setName={setWardName} label={` ${cart.ward}`} name='su_ward' />
                                        </Col>
                                    </Row>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="step-footer mb-2">
                        <a href="/cart" className="step-footer-previous-link">
                            Giỏ hàng
                        </a>
                        <button onClick={handleToPayment} className='step-footer-continue-btn '>
                            Phương thức thanh toán
                        </button>
                    </div>
                    {error.emptyError && <div className="alert alert-danger">Vui lòng điền đầy đủ thông tin</div>}
                    {error.phoneError && <div className="alert alert-danger">Số điện thoại không hợp lệ</div>}
                </div>
            </div>
        </div>

    )
}

export default CheckoutInfo