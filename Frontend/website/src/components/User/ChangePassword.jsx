import React, { useState } from 'react'
import Breadscrumb from '../Breadscrumb'
import { Button, TextField } from '@mui/material'
import { changePassword } from '../../services/UserService'
const ChangePassword = ({ cookies }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp')
            return
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            setError('Mật khẩu phải có ít nhất 6 ký tự và nhiều nhất 20 ký tự')
            return
        }
        const data = {
            oldPassword,
            newPassword,
            token: cookies.authToken,
        }
        changePassword(data).then(res => {
                window.location.href = '/account'
            }
        ).catch(err => {
            setError(err.response.data)
            return
        })
        setError('')
    }

    return (
        <div>
            <Breadscrumb label={'Đổi mật khẩu'} />
            <div id="PageContainer">
                <div className='password-form mb-5 mt-3'>
                    <div>
                        <h5>Đổi mật khẩu</h5>
                        <div className='mb-3'>
                            <TextField
                                required
                                label="Old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                        <div className='mb-3'>
                            <TextField
                                required
                                label="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                        <div className='mb-3'>
                            <TextField
                                required
                                label="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                        <Button onClick={handleSave} variant="contained">Save</Button>
                        {error !== '' && <div className='mt-3 warning' style={{color: 'red'}}>{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword