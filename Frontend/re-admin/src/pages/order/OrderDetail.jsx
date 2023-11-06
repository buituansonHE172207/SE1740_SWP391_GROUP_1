import React, { useState, useEffect } from "react"
import "./order.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import { getOrderById } from "../../service/OrderService"

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

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
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="order-detail" style={{padding: '20px'}}>
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
            </div>
        </div>
    )
}

export default OrderDetail