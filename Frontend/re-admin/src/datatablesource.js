export const authorColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "author",
    headerName: "Author",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "company",
    headerName: "Company",
    width: 230,
  },

];


export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 300,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.images[0] && params?.row?.images[0]?.link} alt="avatar" />
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

export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "paymentState", headerName: "Payment Method", width: 150, },
  {
    field: "shippingState", headerName: "Shipping State", width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.shippingState.toLowerCase()}`}>
          {params.row.shippingState}
        </div>
      );
    },
  },
  {
    field: "totalPrice", headerName: "Total Price", width: 120,
    renderCell: (params) => {
      return (
        <div>{params.row.totalPrice.toLocaleString()}₫</div>
      )
    }
  },
]

export const collectionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "isDisplay", headerName: "Display", width: 150, }
]

export const sliderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 150 },
  {
    field: "imageUrl", headerName: "Image", width: 250,
    renderCell: (params) => {
      return (
        <div className="sliderWithImg">
          <img className="sliderImg" src={params.row.imageUrl} alt="avatar" />
          {params.row.imageUrl}
        </div>
      );
    },
  },
  { field: "backLink", headerName: "Back Link", width: 150, },
  { field: "description", headerName: "Description", width: 150, }
]

export const publisherColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "website", headerName: "Website", width: 250 },
]

export const postColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 150 },
  {
    field: 'category', headerName: 'Category', width: 150,
    renderCell: (params) => {
      return (
        <div>
          { params.row.category.name }
        </div>
      );
    },
  },
  { field: 'createdAt', headerName: 'Created Time', width: 250 },
  {
    field: 'author', headerName: 'Author', width: 150,
    renderCell: (params) => {
      return (
        <div>
          { params.row.user.fullName }
        </div>
      );
    },
  }
]