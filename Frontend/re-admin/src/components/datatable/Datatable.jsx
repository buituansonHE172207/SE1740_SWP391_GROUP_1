import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { authorColumns, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../../service/BookService";
import { getAllAuthors, deleteAuthor } from "../../service/AuthorService";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const Datatable = ({ type }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([])
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

  const searchHandler = () => {
    const searchedData = []
    switch (type) {
      case "products":
        data.forEach(element => {
          if (window.location.href.includes("products")) {
            if (element.title.toLowerCase().includes(search.toLowerCase())) {
              searchedData.push(element)
            }
          } else {
          }
        });
        setSearchedData(searchedData)
        break;
      case "authors":
        data.forEach(element => {
          if (window.location.href.includes("authors")) {
            console.log(element)
            if (element.name.toLowerCase().includes(search.toLowerCase())) {
              searchedData.push(element)
            }
          } else {
            console.log(element)
          }
        });
        setSearchedData(searchedData)
        break;
      default:
        break;
    }
    // data.forEach(element => {
    //   if (window.location.href.includes("authors")) {
    //     console.log(element)
    //     if (element.name.toLowerCase().includes(search.toLowerCase())) {
    //       searchedData.push(element)
    //     }
    //   } else {
    //     console.log(element)
    //   }
    // });
    // setSearchedData(searchedData)
  }

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
          setSearchedData(res.data)
          console.log(res.data)
        }).catch(err => console.log(err));
        break;
      case "authors":
        getAllAuthors().then((res) => {
          setColumns(authorColumns.concat(actionColumn));
          setData(res.data);
          setSearchedData(res.data)
          console.log(res.data)
        }).catch(err => console.log(err));
        break;
      default:
        break;
    }

  }, [type])

  return (
    <div className="datatable">
      <div className="search" style={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
        <input onChange={(e) => {
          setSearch(e.target.value)
        }} value={search} type="text" placeholder="Search..." />
        <SearchOutlinedIcon onClick={searchHandler} />
      </div>
      <div className="datatableTitle">
        Manage {type}
        <Link to={`/${type}/new`} className="link">
          Add New {type}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={searchedData}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
      />
    </div>
  );
};

export default Datatable;
