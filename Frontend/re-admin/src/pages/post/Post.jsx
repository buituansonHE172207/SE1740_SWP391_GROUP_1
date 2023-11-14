import React, { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { postColumns } from "../../datatablesource";
import { getAllPosts, deletePost } from "../../service/PostService";
import { Link } from "react-router-dom";

const Post = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);

    const handleDelete = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this post?"
        )
        if (!confirmBox) return
        deletePost(id).then((res) => {
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
                        <Link to={`/posts/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        getAllPosts().then((res) => {
            setData(res.data.content)
            setColumns(postColumns.concat(actionColumn))
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
                        <Link to={`/posts/new`} className="link">
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

export default Post