import React, { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { feedbackColumns } from "../../datatablesource";
import { getAllFeedbacks } from "../../service/FeedbackService";
import { Link, useNavigate } from "react-router-dom";

const Feedback = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate()

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/feedbacks/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Respond</div>
                        </Link>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getAllFeedbacks().then((res) => {
            setData(res.data)
            setColumns(feedbackColumns.concat(actionColumn))
        })
    }, [])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Feedbacks
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

export default Feedback