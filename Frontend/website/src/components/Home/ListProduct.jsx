import React from "react";
import { useState, useEffect } from "react";
import { getBookByQuery } from "../../services/BookService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ListProduct = (props) => {
    const [books, setBooks] = useState([]);

    const fetchData = () => {
        getBookByQuery(props.query)
            .then(res => {
                setBooks(res.data.content);
            })
            .catch((error) => console.log("Error fetching book data " + error));
    }
    
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div id="home-pro-products">
            <div className="container">
                <div className="section-title text-center clearfix">
                    <h3>{props.title}</h3>
                </div>
                <div className="row justify-content-center">
                    {
                        books.map(book => {
                            return (
                                <div key={book.id} className="col-lg-2">
                                    <div className="product-item">
                                        <div className="product-img">
                                            <a href={`/products/${book.id}`}>
                                                <img src={book.images[0].link} alt={book.title} />
                                            </a>
                                            <div className="tag-saleoff text-center">
                                                -{book.discount * 100}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-title">
                                            <a className="text-container" href={`/products/${book.id}`}>{book.title}</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="current-price">{book.salePrice.toLocaleString()}₫</span>
                                            <span className="original-price"><s>{book.price.toLocaleString()}₫</s></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="grid__item large--one-whole text-right">
                        <a href="https://www.google.com/">Xem thêm &gt;&gt;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;