import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { authorColumns, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../service/BookService";
import { getAllAuthors, deleteAuthor } from "../../service/AuthorService";
const Datatable = ({type}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    switch (type) {
      case "products":
        deleteBook(id).then((res) => {
          window.location.reload();
        });
        break;
      case "authors":
        deleteAuthor(id).then((res) => {
          window.location.reload();
        });
        break;
      default:
        break;
    }
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
    switch (type) {
      case "products":
        getAllBooks().then((res) => {
          setData(res.data);
          setColumns(productColumns.concat(actionColumn));
        });
        break;
      case "authors":
        getAllAuthors().then((res) => {
          setColumns(authorColumns.concat(actionColumn));
          setData(res.data);
        });
        break;
      default:
        break;
    }
  }, [type])

  return (
    <div className="datatable">
      <div className="datatableTitle">
        New {type}
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
