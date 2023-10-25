export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];


export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.images[0].link} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 230,
  },

  {
    field: "state",
    headerName: "State",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.state.toLowerCase()}`}>
          {params.row.state}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div>{params.row.price.toLocaleString()}</div>
      )
    }
  },
];
