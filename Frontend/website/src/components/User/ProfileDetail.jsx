import React from 'react'
import Breadscrumb from '../Breadscrumb'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/esm/Form'
import { useState, useEffect } from 'react'
import SelectAddress from '../Home/SelectAddress'
import { getProvince, getDistrict, getWard } from '../../services/CityService'
import Button from 'react-bootstrap/esm/Button'
import jwt_decode from 'jwt-decode'
import { getUserInfoByEmail, updateUser } from "../../services/UserService"
const ProfileDetail = ({ cart, cookies }) => {

    const [errors, setErrors] = useState({ emptyError: false, phoneError: false, emailError: false, passwordError: false })
    const [profileData, setProfileData] = useState()
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

    useEffect(() => {
        const token = cookies.authToken
        const decode = jwt_decode(token)
        const fetchUserInfo = async () => {
            const res = await getUserInfoByEmail(decode.sub)
            setProfileData(res?.data)
            console.log(res?.data)
        }
        fetchUserInfo()
    }, [cookies.authToken])

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (profileData.fullName.trim() === '' || profileData.phone.trim() === '' || profileData.address.trim() === '' || profileData.email.trim() === '') {
            setErrors({ ...errors, emptyError: true })
            return;
        }
        else {
            setErrors({ ...errors, emptyError: false })
        }
        const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g
        const email_regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
        const password_regex = /[a-zA-Z\d]{6,}$/g
        if (!phone_regex.test(profileData.phone)) {
            setErrors({ ...errors, phoneError: true })
            return;
        }
        else {
            setErrors({ ...errors, phoneError: false })
        }
        if (!email_regex.test(profileData.email)) {
            setErrors({ ...errors, emailError: true })
            return;
        }
        else {
            setErrors({ ...errors, emailError: false })
        }
        if (!password_regex.test(profileData.password)) {
            setErrors({ ...errors, passwordError: true })
            return;
        }
        else {
            setErrors({ ...errors, passwordError: false })
        }
        if (province_name && district_name && ward_name) {
            profileData.province = province_name
            profileData.district = district_name
            profileData.ward = ward_name
        }
        updateUser(profileData).then(res => {
            if (res.status === 200) {
                window.location.reload()
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            {!cookies.authToken && (window.location.href = '/login')}
            <Breadscrumb label="Account" />
            {profileData && (
                <div id="PageContainer">
                    <div className="main-content">
                        <section id="page-wrapper">
                            <div className="container">
                                <h3>TÀI KHOẢN CỦA BẠN</h3>
                                <hr className="hr--small" />
                                <Row>
                                    <Col md={12}>
                                        <Form className='update-form shadow p-3 mb-5 bg-body rounded'>
                                            <h4>Thông tin tài khoản</h4>
                                            <Form.Group>
                                                <Form.Label>Họ tên</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={profileData.fullName}
                                                    onChange={handleProfileChange}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleProfileChange}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleProfileChange}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                                <Form.Label>Địa chỉ</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={profileData.address}
                                                    onChange={handleProfileChange}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                                <Row>
                                                    <Col lg={12} style={{ marginBottom: '10px' }}>
                                                        <label htmlFor="select-address">Tỉnh/Thành phố:</label>
                                                        <SelectAddress
                                                            reset={reset}
                                                            options={provinces}
                                                            value={province}
                                                            setValue={setProvince}
                                                            setName={setProvinceName}
                                                            name="su_province"
                                                            label={` ${profileData.province}`}
                                                            style={{ marginBottom: '10px' }}
                                                        />
                                                    </Col>
                                                    <Col lg={12} style={{ marginBottom: '10px' }}>
                                                        <label htmlFor="select-address">Quận/Huyện:</label>
                                                        <SelectAddress
                                                            reset={reset}
                                                            options={districts}
                                                            value={district}
                                                            setValue={setDistrict}
                                                            setName={setDistrictName}
                                                            name="su_district"
                                                            label={`${profileData.district}`}
                                                        />
                                                    </Col>
                                                    <Col lg={12} style={{ marginBottom: '10px' }}>
                                                        <label htmlFor="select-address">Phường/Xã:</label>
                                                        <SelectAddress
                                                            reset={reset}
                                                            options={wards}
                                                            value={ward}
                                                            setValue={setWard}
                                                            setName={setWardName}
                                                            label={` ${profileData.ward}`}
                                                            name="su_ward"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Button onClick={handleUpdate} variant="success">Cập nhật</Button>
                                                {errors.emptyError && <p style={{ color: 'red' }}>Vui lòng điền đầy đủ thông tin</p>}
                                                {errors.phoneError && <p style={{ color: 'red' }}>Số điện thoại không hợp lệ</p>}
                                                {errors.emailError && <p style={{ color: 'red' }}>Email không hợp lệ</p>}
                                                {errors.passwordError && <p style={{ color: 'red' }}>Mật khẩu phải có ít nhất 6 ký tự</p>}
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDetail