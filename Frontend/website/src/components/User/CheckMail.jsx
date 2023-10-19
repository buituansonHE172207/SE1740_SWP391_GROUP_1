import React from 'react'
import Breadscrumb from '../Breadscrumb'

const CheckMail = () => {
  return (
    <div>
        <Breadscrumb label='Kiểm tra mail'/>
        <div className='main-check-email'>
            <div className='main-content'>
                <div className='step'>
                    <div className='step-sections'>
                        <div className='section'>
                            <div className='section-header'>
                                <h5>Kiểm tra mail</h5>
                            </div>
                            <div className='section-content section-customer-information no-mb'>
                                <div className='mb-3'>
                                    <label for='name' className='form-label'>Hãy kiểm tra hộp thư của bạn</label>
                                    <i className="fa-solid fa-check" style={{color: '#3bb832', fontSize:'30px'}}></i>
                                    <p>Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để hoàn tất đăng ký.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckMail