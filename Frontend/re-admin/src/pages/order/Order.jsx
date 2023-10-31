import React, { useState, useEffect } from "react"
import "./order.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import { getAllOrders } from "../../service/OrderService"
import { Link } from "react-router-dom";

const Order = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);


    const handleChangeState = (row) => {
        console.log(row)
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View Detail</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleChangeState(params.row)}
                        >
                            Change State
                        </div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getAllOrders().then((res) => {
            setData(res.data)
            setColumns(orderColumns.concat(actionColumn))
        })
    }, [])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Orders
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Order