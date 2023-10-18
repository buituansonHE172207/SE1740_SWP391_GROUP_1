import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Breadscrumb from '../Breadscrumb';
import {resetPassword} from '../../services/UserService'
import { useParams, useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchError, setMatchError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [jwtTimeout, setJwtTimeout] = useState(false);
    const {token} = useParams();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const password_regex = /[a-zA-Z\d]{6,}$/g
        if (!password_regex.test(newPassword)) {
            setPasswordError(true);
            setMatchError(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setMatchError(true);
            setPasswordError(false);
            return;
        }
        const data = {
            token: token,
            password: newPassword
        }
        resetPassword(data).then((res) => {
            if (res.status === 200) {
                navigate('/');
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                setJwtTimeout(true);
            }
        })
    };

    return (
        <div>
            <Breadscrumb label="Đặt lại mật khẩu" />
            <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <FormControl
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <FormControl
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-3' style={{background: '#d51c24',
    color: 'white',
    padding: '8px',
    fontSize: '16px',
    border: 'none'}}>
                        Đặt lại mật khẩu
                    </Button>
                    {matchError && <p className='text-danger'>Mật khẩu không khớp</p>}
                    {passwordError && <p className='text-danger'>Mật khẩu phải có ít nhất 6 kí tự</p>}
                    {jwtTimeout && <p className='text-danger'>Thời gian đặt lại mật khẩu hết hạn</p>}
                </Form>
            </div>

        </div>
    );
};

export default ResetPassword;
