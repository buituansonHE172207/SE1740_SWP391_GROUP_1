// ChangePassword.jsx

import React, { useContext, useState } from 'react';
import './changePass.scss';
import { AuthContext } from '../../context/AuthContext';
import { changePassword, getUserInfoByEmail } from '../../service/UserService';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userData = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Dynamically update state based on input name
        switch (name) {
            case 'currentPassword':
                setCurrentPassword(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMail = userData.currentUser.sub;
        if (newPassword != confirmPassword) {
            console.log("Comfirm password incorrect")
        }
        console.log(userMail)
        const user = await getUserInfoByEmail(userMail)
        console.log(user)
        const data = {
            currentPassword,
            newPassword,
            token: ""
        }
        changePassword(data).then(res => {
            console.log('Password changed successfully!');
        }
        ).catch(err => {
            console.log(err.response.data)
            return
        })
    };

    return (
        <div style={{ height: "90vh", display: 'flex', justifyItems: "center", alignItems: "center" }}>
            <div className="change-password-container" >
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
