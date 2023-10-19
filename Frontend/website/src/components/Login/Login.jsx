import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Breadscrumb from '../Breadscrumb'
import { login } from '../../services/UserService'
const Login = ({ setCookies = { setCookies } }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({ formatError: false, loginError: false })

    const handleSubmit = (e) => {
        e.preventDefault()
        const email_regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
        const password_regex = /[a-zA-Z\d]{6,}$/g
        if (data.email === '' || data.password === '' || !email_regex.test(data.email) || !password_regex.test(data.password)) {
            setError((prevData) => ({ ...prevData, loginError: true }))
            return;
        }
        else {
            setError((prevData) => ({ ...prevData, loginError: false }))
        }
        let account = { email: data.email, password: data.password }
        login(account).then(res => {
            setCookies('authToken', res.data.token)
            window.location.href = '/'
        })
            .catch(err => {
                setError((prevData) => ({ ...prevData, loginError: true }))
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div id='page-wrapper' className='mb-5'>
            <Breadscrumb label={'Login'} />
            <Container className='mt-5'>
                <Row>
                    <Col lg={3} className='login'>
                        <div className='form-vertical'>
                            <h4>
                                Đăng nhập
                            </h4>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder="Email" name='email' value={data.email} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control type="password" placeholder="Mật khẩu" name='password' value={data.password} onChange={handleChange} />
                                </Form.Group>
                                <button className='btn-signin' type="submit">
                                    Đăng nhập
                                </button>
                                <a href="/forgot-password" className='ms-3'>Quên mật khẩu</a>
                            </Form>
                            {error.loginError && (
                                <div className='error-message'>
                                    <p className='text-danger'>Email hoặc mật khẩu không đúng</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login