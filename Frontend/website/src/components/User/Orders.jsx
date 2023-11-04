import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/esm/Button';
import { cancelOrder } from '../../services/OrderService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const handleCancel = (id) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')
    if (!confirm) return
    cancelOrder(id).then(res => {
        window.location.reload()
    })
}

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

const Orders = ({ orders }) => {
    console.log(orders)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Đơn hàng</StyledTableCell>
                        <StyledTableCell align="center">Ngày&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Tình trạng thanh toán&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Tình trạng vận chuyển&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Trạng thái&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Tổng&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Chức năng&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <StyledTableRow key={order.id}>
                            <StyledTableCell align='center' component="th" scope="row">
                                {order.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{formatDate(order?.created)}</StyledTableCell>
                            <StyledTableCell align="center">{order.paymentState}</StyledTableCell>
                            <StyledTableCell align="center">{order.shippingState}</StyledTableCell>
                            <StyledTableCell align="center">{order.state}</StyledTableCell>
                            <StyledTableCell align="center">{order.orderDetails?.reduce((total, item) => {
                                return total + item.amount * item.salePrice
                            }, 30000)?.toLocaleString()}₫</StyledTableCell>
                            <StyledTableCell align="center" style={{display: 'flex'}}>
                                <a href={`/order-detail/${order.id}`}><Button style={{fontSize: '14px'}} variant="outline-info">Chi tiết</Button></a>
                                {(order.shippingState === 'NOTSHIPPING' && order.state !== 'CANCELED') && <Button onClick={() => handleCancel(order.id)} style={{fontSize: '14px', marginLeft: '10px'}} variant="outline-danger">Hủy đơn hàng</Button>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Orders