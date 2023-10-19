import React, {useState} from 'react'
import Breadscrumb from '../Breadscrumb'
import { useParams } from 'react-router-dom'
import { activateAccount } from '../../services/UserService'
const Activate = () => {
    const token = useParams()
    const [error, setError] = useState({})
    const activate = () => {
        activateAccount(token).then(res => {
            window.location.href = '/login'
        })
        .catch(() => {
            setError({error: true})
        })
    }
    return (
        <div>
            <Breadscrumb label={'Kích hoạt tài khoản'} />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <button className='btn-signin mt-5 mb-5 login' onClick={activate}>
                            Kích hoạt
                        </button>
                        {error.error && (
                            <p className='text-danger text-center'>Kích hoạt tài khoản thất bại</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activate