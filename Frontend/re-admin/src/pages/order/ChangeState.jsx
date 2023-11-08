import React, { useState, useEffect, useRef } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useParams } from 'react-router-dom'
import { Container, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { getOrderById } from "../../service/OrderService";
import { changeShippingState, changeOrderState } from "../../service/OrderService";
const ChangeState = () => {
    const { id } = useParams()
    const [shippingState, setShippingState] = useState('')
    const [orderState, setOrderState] = useState('')
    const [data, setData] = useState({})

    const handleSave = () => {
        window.location.href = '/orders'
    }

    useEffect(() => {
        getOrderById(id).then(res => {
            setData(res.data)
            setShippingState(res.data.shippingState)
            setOrderState(res.data.state)
        })
    }, [])

    const handleChangeShipping = (e) => {
        setShippingState(e.target.value)
        changeShippingState(id, e.target.value)
    }

    const handleChangeOrder = (e) => {
        setOrderState(e.target.value)
        changeOrderState(id, e.target.value)
    }

    return (
        <div>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <Container>
                        <Grid container spacing={3} style={{marginTop: '20px'}}>
                            <Grid item xs={6} sm={6}>
                                <FormControl key="shippingState" fullWidth>
                                    <InputLabel variant="standard" htmlFor="shippingState">
                                        Shipping State
                                    </InputLabel>
                                    <NativeSelect
                                        value={shippingState}
                                        inputProps={{
                                            name: "shippingState",
                                            id: "shippingState",
                                        }}
                                        onChange={(e) => handleChangeShipping(e)}
                                    >
                                        <option value="NOTSHIPPING">NOTSHIPPING</option>
                                        <option
                                            value="SHIPPING">SHIPPING</option>
                                        <option
                                            value="DELIVERED">DELIVERED</option>
                                        <option
                                            value="RETURNED">RETURNED</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl key="orderState" fullWidth>
                                    <InputLabel variant="standard" htmlFor="orderState">
                                        Order State
                                    </InputLabel>
                                    <NativeSelect
                                        value={orderState}
                                        inputProps={{
                                            name: "orderState",
                                            id: "orderState",
                                        }}
                                        onChange={(e) => handleChangeOrder(e)}
                                    >
                                        <option value="ORDER">ORDER</option>
                                        <option value="CART">CART</option>
                                        <option value="PROCESSING">PROCESSING</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="SHIPPING">SHIPPING</option>
                                        <option value="CANCELED">CANCELED</option>
                                        <option value="RETURNED">RETURNED</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button onClick={handleSave} style={{marginTop: '20px'}} variant="contained">Save</Button>
                    </Container>


                </div>
            </div>
        </div>
    );
};

export default ChangeState