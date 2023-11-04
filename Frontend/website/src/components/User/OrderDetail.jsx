import React, { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import { getOrderById } from "../../services/OrderService";
import Breadscrumb from "../Breadscrumb";

const formatDate = (inputDate) => {
    var date = new Date(inputDate);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}

const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        getOrderById(id).then(res => {
            setOrder(res.data)
        })
    }, [])

    return (
        <div>
            <div id='breadcrumb-wrapper' className='breadcrumb-w-img'>
                <Breadscrumb label={'Order detail'}/>
                <section id='product-wrapper'>
                    <div className='container'>
                        <div className="order-detail" style={{ padding: '20px' }}>
                            <h3>Order: {order.id}</h3>
                            <div>
                                Order date: {formatDate(order.created)}
                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                <h3>Details</h3>
                                            </TableCell>
                                            <TableCell align="right"><h3>Price</h3></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="right">Qty.</TableCell>
                                            <TableCell align="right">Unit</TableCell>
                                            <TableCell align="right">Sum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order?.orderDetails?.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.book.title}</TableCell>
                                                <TableCell align="right">{item.amount.toLocaleString()}</TableCell>
                                                <TableCell align="right">{item.salePrice.toLocaleString()}</TableCell>
                                                <TableCell align="right">{(item.amount * item.salePrice).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={3} />
                                            <TableCell colSpan={2}>Fee</TableCell>
                                            <TableCell align="right">
                                                {order?.orderDetails?.reduce((sum, item) => sum + item.amount * item.salePrice, 0).toLocaleString()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Shipping</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">{"30,000"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Total</TableCell>
                                            <TableCell align="right">{order?.orderDetails?.reduce((sum, item) => sum + item.amount * item.salePrice, 30000).toLocaleString()}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default OrderDetail