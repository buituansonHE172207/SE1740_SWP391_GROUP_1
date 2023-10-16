import React, { useEffect } from 'react'
import CollectionHeader from '../CollectionHeader'
import { Link, useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { getBookById } from '../../services/BookService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const ProductDetail = () => {
    const [book, setBook] = useState({})
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()

    const fetchBook = async () => {
        const res = await getBookById(id)
        const { data } = res
        setBook(data)
    }

    const book_images = book.images ? book.images : []
    const book_authors = book.authors ? book.authors : []
    const book_item = book_images.map((image, index) => {
        return (
            <Carousel.Item key={index} interval={3000}>
                <img
                    className="d-block w-100"
                    src={image.link}
                    alt="First slide"
                />
            </Carousel.Item>
        )
    })
    const book_collections = book.collections ? book.collections : []


    useEffect(() => {
        fetchBook()
    }, [])
    return (
        <div>
            <div id='breadcrumb-wrapper' className='breadcrumb-w-img'>
                <CollectionHeader />
                <section id='product-wrapper'>
                    <div className='container'>
                        <div className='row product-single'>
                            <div className='col-lg-5' style={{ position: 'relative' }}>
                                <div className='sale-percentage-btn'>
                                    -{book.discount * 100}%
                                </div>
                                <div className='product-single__photos'>
                                    <Carousel>
                                        {book_item}
                                    </Carousel>
                                </div>
                            </div>

                            <div className='col-lg-7'>
                                <div className='product-content'>
                                    <div className='pro-content-head'>
                                        <div className='header-wishlist'>
                                            <h1>{book.title}</h1>
                                        </div>
                                        <div className='pro-rating'>
                                            <div className='starbap-prev-badge'>
                                                <a className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <span className='starbap-prev-badgetext'>
                                                    0 đánh giá
                                                </span>
                                            </div>
                                            <div className='daban'>
                                                Đã bán: {book.sold}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pro-price'>
                                        <span className='current-price ProductPrice'>
                                            {book.salePrice ? book.salePrice.toLocaleString() : 'N/A'}₫
                                        </span>
                                        <span className='original-price ComparePrice'>
                                            <s>{book.price ? book.price.toLocaleString() : 'N/A'}₫</s>
                                        </span>

                                        <div className='sale-percentage'>
                                            <span className='PriceSaving'>
                                                ( {book.price && book.salePrice ? (
                                                    `Bạn đã tiết kiệm được ${(book.price - book.salePrice).toLocaleString()}₫`
                                                ) : 'N/A'} )
                                            </span>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col lg={6}>
                                            <div className='pro-short-desc'>
                                                <ul>
                                                    <li>
                                                        ISBN:
                                                        <strong> {book.isbn} </strong>
                                                    </li>
                                                    <li>
                                                        Tác giả:
                                                        <strong> {book_authors.map(author => <span key={author.id}>{author.name}</span>)} </strong>
                                                    </li>
                                                    {
                                                        book_collections
                                                            .filter(collection => collection.type === "ĐỘ TUỔI")
                                                            .map(collection => (
                                                                <li key={collection.id}>
                                                                    Độ tuổi: <Link style={{ color: '#d51c24' }} to={`/collections/${collection.id}`}>{collection.name}</Link>
                                                                </li>
                                                            ))
                                                    }
                                                    <li>
                                                        Khuôn Khổ:
                                                        {book.size}
                                                    </li>
                                                    <li>
                                                        Số trang:
                                                        {book.page}
                                                    </li>
                                                    <li>
                                                        Định dạng:
                                                        {book.cover}
                                                    </li>
                                                    <li>
                                                        Trọng lượng:
                                                        {book.weight}g
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <form>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className='product-quantity'>
                                                            <div className='qty-addcart'>
                                                                <span>Số lượng</span>
                                                                <div className='js-qty'>
                                                                    <button type='button' onClick={() => {
                                                                        if (quantity > 1) {
                                                                            setQuantity(quantity - 1)
                                                                        }
                                                                    }}>
                                                                        <i className='fa-solid fa-minus'></i>
                                                                    </button>
                                                                    <input type="text" name='quantity' inputMode="numeric" onChange={(e) => {
                                                                        const newValue = parseInt(e.target.value, 10);
                                                                        if (!isNaN(newValue) && newValue >= 1 && newValue <= book.stock) {
                                                                            setQuantity(newValue);
                                                                        }
                                                                    }} value={quantity} />
                                                                    <button type='button' onClick={() => {
                                                                        if (quantity < book.stock) {
                                                                            setQuantity(quantity + 1)
                                                                        }
                                                                    }}>
                                                                        <i className='fa-solid fa-plus'></i>
                                                                    </button>
                                                                </div>
                                                                <div className="max-stock">
                                                                    <span>Available: {book.stock}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className='product-actions'>
                                                            <Button name='add' className='btnAddToCart is-adding'>Thêm vào giỏ hàng</Button>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <Button name='buy' className='btnBuyNow'>Mua Ngay</Button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col lg={9}>
                                <div className='product-description-wrapper'>
                                    <div className='tab'>
                                        <button className='pro-tablinks active'>
                                            <span>Mô tả - Đánh giá</span>
                                        </button>
                                        <button className='pro-tablinks'>
                                            <span>Bình luận</span>
                                        </button>
                                    </div>
                                    <div className='pro-tabcontent'>
                                        {book.description}
                                    </div>
                                    <div className='pro-tabcontent' style={{display: 'none'}}>
                                        
                                    </div>
                                </div>
                                <div className='product-description-wrapper'>
                                    
                                </div>
                            </Col>
                            <Col lg={3}>
                                
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProductDetail


// {
//     "id": 1,
//     "title": "Chú Thuật Hồi Chiến - Tập 17 - Bản giới hạn",
//     "publisher": {
//         "id": 1,
//         "name": "Nhà Xuất Bản Kim Đồng",
//         "website": null
//     },
//     "authors": [
//         {
//             "id": 1,
//             "name": "Gege Akutami",
//             "company": null
//         }
//     ],
//     "collections": [
//         {
//             "id": 14,
//             "name": "TUỔI TRƯỞNG THÀNH(TRÊN 18 TUỔI)",
//             "type": "ĐỘ TUỔI",
//             "isDisplay": true
//         },
//         {
//             "id": 6,
//             "name": "MANGA-COMIC",
//             "type": "THỂ LOẠI",
//             "isDisplay": true
//         }
//     ],
//     "description": null,
//     "stock": 1,
//     "sold": 1,
//     "publicationDate": "2021-09-11",
//     "size": "11.3x17.6 cm",
//     "weight": 140,
//     "price": 27000,
//     "language": {
//         "id": 1,
//         "name": "Tiếng Anh"
//     },
//     "page": 200,
//     "cover": "Bìa mềm",
//     "discount": 0.1,
//     "category": {
//         "id": 1,
//         "name": "Manga - Comic"
//     },
//     "images": [
//         {
//             "id": 1,
//             "link": "https://product.hstatic.net/200000343865/product/17_3216c448936a49568a22dd2d39d1f8ce_master.jpg",
//             "description": "Cover Image"
//         }
//     ],
//     "salePrice": 24300,
//     "rating": 0.0,
//     "isbn": "978-604-2-33155-5"
// }