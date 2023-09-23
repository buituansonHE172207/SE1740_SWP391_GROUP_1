import React from "react";
import { useState, useEffect } from "react";
import { getTop5NewBook } from "../services/BookService";
const ViewProduct = () => {
    const [books, setBooks] = useState([])

    const fetchData = () => {
        getTop5NewBook()
            .then(res => setBooks(res.data.content))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div id="home-pro-products">
                <div className="container">
                    <div className="section-title text-center clearfix">
                        <h2>SACH MOI</h2>
                    </div>
                    <div className="row">
                        {
                            books.map(book => {
                                return (
                                    <div key={book.id} className="col-lg-2">
                                        <div className="product-item">
                                            <div className="product-img">
                                                <a href="#">
                                                    <img src={book.images[0].link} alt={book.title} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <div className="product-title">
                                                <a href="#">{book.title}</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            // JSON.stringify(books)
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewProduct