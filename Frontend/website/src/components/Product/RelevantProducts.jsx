import React, { useEffect, useState } from 'react'
import { getBooksByCollectionId } from '../../services/BookService'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
const RelevantProducts = ({ collection_id }) => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        collection_id && getBooksByCollectionId(collection_id).then(res => {
            const data = res.data
            setBooks(data.content.slice(0, 6))
        })
    }, [collection_id])
    console.log(books)

    return (
        <div className='home-section-body abc'>

            {books.map(book => (
                <Row key={book.id} className='mb-3'>
                    <Col md={4}>
                        <div className="rsp-img">
                            <a href={`/products/${book.id}`}>
                                <img src={book.images[0].link} style={{ width: '-webkit-fill-available', borderRadius: '5px' }} alt="image" />
                            </a>
                        </div>
                    </Col>
                    <Col md={8} className="rsp-info">

                        <div className="rsp-title">
                            <a className='text-container' href={`/products/${book.id}`}>{book.title}</a>
                        </div>
                        <div className="rsp-price">
                            <span className="rsp-current-price">
                                {book.salePrice?.toLocaleString()}₫
                            </span>
                            <span className="rsp-original-price">
                                <s>{book.price?.toLocaleString()}₫</s>
                            </span>
                        </div>

                    </Col>
                </Row>
            ))}


        </div>
    )
}

export default RelevantProducts