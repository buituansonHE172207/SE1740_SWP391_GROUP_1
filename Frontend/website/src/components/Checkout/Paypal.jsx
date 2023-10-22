import React, { useEffect } from 'react'
import { addOrder } from '../../services/OrderService'
const Paypal = ({value, cart, setCart}) => {
    
    const paypal = React.useRef()
    
    const getPay = () => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: value,
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                setCart({...cart, paymentState: 'PAID'})
                addOrder(cart).then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }

    useEffect(() => {
        !isNaN(value) && getPay() 
    }, [value])
  return (
    <div style={{height: '500px'}} className='payment mt-5 mb-5'>
        <div ref={paypal}>

        </div>
    </div>
  )
}

export default Paypal