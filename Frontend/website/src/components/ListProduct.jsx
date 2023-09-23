// import React from "react";
// import { useState, useEffect } from "react";
// import { getBookByQuery } from "../services/BookService";
// import { useNavigate } from "react-router-dom";

// const ListProduct = (props) => {
//     const [books, setBooks] = useState([]);

//     const fetchData = () => {
//         getBookByQuery(props.query)
//             .then(res => {
//                 setBooks(res.data);
//             })
//             .catch((error) => console.log("Error fetching book data " + error));
//     }

//     useEffect(() => {
//         fetchData()
//     }, [books]);

//     return (
//         <div id="home-pro-products">
//             <div className="container">
//                 <div className="section-title text-center clearfix">
//                     <h2>{props.title}</h2>
//                 </div>
//                 <div className="row">
//                     <div key={b.content.id} className="col-lg-2">
//                         <div className="product-item">
//                             <div className="product-img">
//                                 <a href="#">
//                                     <img src={b.content.images[0].link} alt={b.content.title} />
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="product-info">
//                             <div className="product-title">
//                                 <a href="#">{b.content.title}</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ListProduct;