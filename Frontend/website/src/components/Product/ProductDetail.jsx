import React, { useEffect } from 'react'
import CollectionHeader from '../CollectionHeader'
import { Link, useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { getBookById } from '../../services/BookService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addToCart, updateCartItem } from '../../services/CartService';
import { getWishlistByUserId, deleteWishList, addWishList } from '../../services/WishlistService';
import RelevantProducts from './RelevantProducts';

const ProductDetail = ({ cookies, cart, cartChange, setCartChange, setCart }) => {
    const [book, setBook] = useState({})
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [stockError, setStockError] = useState(false)
    const [tempCart, setTempCart] = useState({})
    const [wishlist, setWishlist] = useState([])
    const [heart, setHeart] = useState(false)
    const fetchBook = async () => {
        const res = await getBookById(id)
        const { data } = res
        setBook(data)
    }
    console.log(book)
    const book_images = book.images ? book.images : []
    const book_authors = book.authors ? book.authors : []
    const book_item = book_images?.map((image, index) => {
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
    console.log(book_collections)
    
    useEffect(() => {
        fetchBook()
    }, [])

    const toggleHeart = () => {
        if (!cookies?.authToken)
        {
            window.location.href = '/login'
            return
        }
        if (heart)
        {
            cart?.user?.id && deleteWishList(cart?.user?.id, id).then(res => {
                setHeart(false)
            })
            return
        }
        cart?.user?.id && addWishList(cart?.user?.id, id).then(res => {
            setHeart(true)
        })
    }

    const handleItemChange = (e, order_id) => {
        setTempCart(cart => {
            const newCart = { ...cart }
            newCart.orderDetails = newCart.orderDetails.map(item => {
                if (item.id === order_id && parseInt(e.target.value, 10) <= item.book.stock && parseInt(e.target.value, 10) >= 1) {
                    item.amount = parseInt(e.target.value, 10)
                }
                return item
            })
            return newCart
        })
    }

    const updateCart = () => {
        updateCartItem(tempCart).then(res => {
            setCartChange(!cartChange)
            handleClose()
        })
    }

    const addToCartHandler = () => {
        if (!cart?.user?.id)
        {
            window.location.href = '/login' 
            return
        }
        setStockError(false)

        const cartData = { userId: cart.user.id, bookId: book.id, amount: quantity }
        addToCart(cartData).then(res => {
            setCartChange(!cartChange)
            handleShow()
        })
            .catch(err => {
                setStockError(true)
            })

    }
    const deleteCartItemHandler = (order_id) => {
        cart.orderDetails = cart.orderDetails.filter(item => item.id !== order_id)
        updateCartItem(cart).then(res => {
            setCartChange(!cartChange)
        })
    }

    const handleBuyNow = () => {
        if (!cart?.user?.id)
        {
            window.location.href = '/login' 
            return
        }
        setStockError(false)

        const cartData = { userId: cart.user.id, bookId: book.id, amount: quantity }
        addToCart(cartData).then(res => {
            setCartChange(!cartChange)
            window.location.href = '/cart'
        })
            .catch(err => {
                setStockError(true)
            })
    }

    useEffect(() => {
        setTempCart({...cart})
    }
    , [cart])

    useEffect(() => {
        const fetchWishlist = async () => {
            const res = await getWishlistByUserId(cart?.user?.id)
            setWishlist(res.data)
        }
        cart?.user?.id && fetchWishlist()
    }, [cart])

    useEffect(() => {
        wishlist && setHeart(wishlist?.some(item => item.book.id === book.id))
    }, [wishlist])

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
                                                <a href className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a href className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a href className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a href className='starbap-star'>
                                                    <i className="fa-regular fa-star" style={{ color: '#d9d326' }}></i>
                                                </a>
                                                <a href className='starbap-star'>
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

                                        <div className='sale-percentage me-5'>
                                            <span className='PriceSaving'>
                                                ( {book.price && book.salePrice ? (
                                                    `Bạn đã tiết kiệm được ${(book.price - book.salePrice).toLocaleString()}₫`
                                                ) : 'N/A'} )
                                            </span>
                                        </div>
                                        {heart ?<i onClick={toggleHeart} className="fa-solid fa-heart" style={{color: '#c20000', cursor: 'pointer'}}></i> : <i onClick={toggleHeart} className="fa-regular fa-heart" style={{color: '#000000', cursor: 'pointer'}}></i>}

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
                                                            <Button onClick={addToCartHandler} name='add' className='btnAddToCart is-adding'>Thêm vào giỏ hàng</Button>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <Button onClick={handleBuyNow} name='buy' className='btnBuyNow'>Mua Ngay</Button>
                                                                </Col>
                                                            </Row>
                                                            {stockError && <h5 className='mt-2' style={{ color: 'red' }}>Số lượng trong kho không đủ</h5>}
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
                                            <span>Mô tả</span>
                                        </button>
                                        <button className='pro-tablinks'>
                                            <span>Đánh giá</span>
                                        </button>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: book.description}} style={{padding: '2%'}} className='pro-tabcontent'></div>
                                    <div className='pro-tabcontent' style={{ display: 'none' }}>

                                    </div>
                                </div>
                                <div className='product-description-wrapper'>

                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className='product-description-wrapper'>
                                    <div className="tab">
                                        <button className="pro-tablinks active" style={{width: '100%'}}>
                                            <span>Sản phẩm tương tự</span>
                                        </button>
                                    </div>
                                    <RelevantProducts collection_id={book_collections[0]?.id} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
            <Modal size='lg' show={show} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='modal-cart-status'>
                        Giỏ hàng của bạn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-main-cart">
                        <div className="modal-tbl-cart">
                            <table className="cart-table full table--responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tempCart ? tempCart.orderDetails?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='product-img'>
                                                    <a href={`/products/${item.book.id}`}>
                                                        <img className='cart-img' src={item.book.images[0].link} alt="image" />
                                                    </a>
                                                </td>
                                                <td className='product-title'>
                                                    <a href={`/products/${item.book.id}`}>
                                                        {item.book.title}
                                                    </a>
                                                </td>
                                                <td className='product-price'>
                                                    <span className="current-price" style={{ display: 'block' }}>{item.salePrice?.toLocaleString()}₫</span>
                                                    <span className="original-price me-5" style={{ display: 'block' }}><s>{item.originalPrice.toLocaleString()}₫</s></span>
                                                    <span className="sale-off" style={{ display: 'block' }}>-{item.book.discount * 100}%</span>
                                                </td>
                                                <td className='product-action'>
                                                    <input type="number" onChange={(e) => handleItemChange(e, item.id)} value={item.amount} />
                                                    <div>Kho: {item.book.stock}</div>
                                                </td>
                                                <td className='product-money'>
                                                    {(item.book.salePrice * item.amount)?.toLocaleString()}
                                                </td>
                                                <td className='product-remove'>
                                                    <i onClick={() => deleteCartItemHandler(item.id)} className="fa-solid fa-trash"></i>
                                                </td>
                                            </tr>
                                        )) : 'abcd'
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-checkout-actions">
                            <Row>
                                <Col lg={6}>
                                    <div className="cart-note-wrapper">
                                        <div className="cart-note">
                                            <textarea name="note" placeholder='Ghi chú' id="CartSpecialInstructions" cols="30" rows="5"></textarea>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="model-cart-checkout text-right">
                                        <div className="modal-cart-sum">
                                            <h4>Tổng: <span>{cart?.orderDetails?.reduce((total, item) => total + item.amount * item.salePrice, 0)?.toLocaleString()}₫</span></h4>
                                            <p className="you-save">
                                                Tiết kiệm: <span>{cart?.orderDetails?.reduce((total, item) => total + item.amount * (item.book.price - item.book.salePrice), 0)?.toLocaleString()}₫</span>
                                            </p>
                                        </div>
                                        <div className="modal-cart-actions">
                                            <div className="modal-cart-actions">
                                                <Button type='button' onClick={updateCart} className='btnRefreshModal update-cart'>
                                                    Cập nhật giỏ hàng
                                                </Button>
                                                <a className='btnProceedCheckOut' href="/checkout">
                                                    Tiến hành thanh toán
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductDetail

