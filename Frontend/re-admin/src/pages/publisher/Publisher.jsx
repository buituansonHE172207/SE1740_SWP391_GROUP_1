import React, { useState, useEffect } from "react"
import "./publisher.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { publisherColumns } from "../../datatablesource";
import { getAllPublishers, deletePublisher } from "../../service/PublisherService";
import { Link, useNavigate } from "react-router-dom";

const Publisher = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate()

    const handleDelete = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this publisher?"
        )
        if (!confirmBox) return
        deletePublisher(id).then((res) => {
            window.location.reload()
        })
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/publishers/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Update</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getAllPublishers().then((res) => {
            setData(res.data)
            setColumns(publisherColumns.concat(actionColumn))
        })
    }, [])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Publishers
                        <Link to={`/publishers/new`} className="link">
                            Add New
                        </Link>
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

export default Publisher