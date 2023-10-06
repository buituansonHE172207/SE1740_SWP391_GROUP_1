import React, { useState } from 'react';
import Breadscrumb from '../Breadscrumb';
import { Form, Button } from 'react-bootstrap';
import {forgetPassword} from '../../services/UserService'
const ForgotPassword = () => {
    const [emailData, setEmail] = useState({email: ''});
    const [isSending, setIsSending] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailData.email)) {
            setEmailError(true);
            return;
        }
        forgetPassword(emailData).then((res) => {
            if (res.status === 200) {
                setIsSending(true);
                setEmailError(false);
            }
        }).catch((err) => {
            alert(err.response.data.message);
        })
    };
    const handleChange = (e) => {
        setEmail({email: e.target.value});
    };

    return (
        <div>
            <Breadscrumb label="Quên mật khẩu"/>
            <div className="d-flex justify-content-center align-items-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                        <h3><Form.Label>Quên mật khẩu</Form.Label></h3>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email của bạn"
                            value={emailData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" className='mt-3 mb-4'>
                        Gửi
                    </Button>
                    {emailError && <p className='text-danger'>Email không hợp lệ</p>}
                    {isSending && <p className='text-success'>Vui lòng kiểm tra email của bạn để đặt lại mật khẩu</p>}
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;