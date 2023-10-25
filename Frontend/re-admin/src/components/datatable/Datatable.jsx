import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBooks } from "../../service/BookService";
const Datatable = ({type}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${type}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
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
    switch (type) {
      case "products":
        getAllBooks().then((res) => {
          setData(res.data);
          setColumns(productColumns.concat(actionColumn));
        });
        break;
      case "users":
        setColumns(userColumns.concat(actionColumn));
        break;
      default:
        break;
    }
  }, [type])

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new {type}
        <Link to={`/${type}/new`} className="link">
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
  );
};

export default Datatable;
