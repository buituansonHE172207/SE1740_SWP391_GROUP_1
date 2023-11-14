import React, { useState, useEffect } from "react"
import "./slider.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { sliderColumns } from "../../datatablesource";
import { getAllSliders, deleteSlider } from "../../service/SliderService";
import { Link } from "react-router-dom";

const Slider = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
  
    const handleDelete = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this slider?"
        )
        if (!confirmBox) return
        deleteSlider(id).then((res) => {
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
                        <Link to={`/sliders/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        getAllSliders().then((res) => {
            setData(res.data)
            setColumns(sliderColumns.concat(actionColumn))
        })
    }, [])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Sliders
                        <Link to={`/sliders/new`} className="link">
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

export default Slider