import React, { useEffect, useRef, useState } from 'react'
import { getBooksByCollectionId, getBooksByQuery } from "../../services/BookService"
import { useNavigate, useParams } from 'react-router-dom'
import Breadscrumb from '../Breadscrumb'
import { Link } from 'react-router-dom'
import { getCollections, getCollectionById } from '../../services/CollectionService'
import { getCategories } from '../../services/CategoryService'
import Pagination from '../Pagination'
const BooksByCollection = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [collections, setCollections] = useState([])
    const book_length = useRef(0)
    const [categories, setCategories] = useState([])
    const [curCollection, setCurCollection] = useState()
    const { id } = useParams()
    const urlParams = new URLSearchParams(window.location.search);
    const [page, setPage] = useState(urlParams.get('page'));
    const [limit,] = useState(12);
    const totalPage = Math.ceil(book_length.current / limit);
   
    const fetchData = (id) => {
        getBooksByQuery(id, page, urlParams.get('min'), urlParams.get('max'))
            .then(res => {
                setBooks(res.data.content)
                book_length.current = res.data.totalElements
            })
            .catch(error => console.error(error))
        getCollections()
            .then(res => setCollections(res.data))
            .catch(error => console.error(error))
        getCategories()
            .then(res => setCategories(res.data))
            .catch(error => console.error(error))
        if (id !== 'all')
            getCollectionById(id)
                .then(res => setCurCollection(res.data))
                .catch(error => console.error(error))
    }

    const collection_items = collections.map(collection => (
        collection.isDisplay ? (
            <li key={collection.id}>
                <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
            </li>
        ) : null
    ));

    console.log(categories)


    const setCurrentPage = (value) => {
        window.scrollTo(0, 0);
        if (value === '&laquo;') {
            setPage(1)
            return
        }
        else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1)
            }
            return
        }
        else if (value === '&rsaquo;') {
            if (page !== totalPage)
                setPage(page + 1)
            return
        }
        else if (value === '&raquo;') {
            setPage(totalPage)
            return
        }
        else if (value === '...') {
            return
        }
        setPage(value)
        if (id === 'all')
            navigate(`/collections/all?page=${page}`)
        else
            navigate(`/collections/${id}?page=${page}`)
    }

    const book_items = books.map(book => {
        return (
            <div key={book.id} className='col-lg-3 mb-4'>
                <div className="product-item">
                    <div className="product-img">
                        <Link to={`/products/${book.id}`}>
                            <img src={book.images[0].link} alt={book.title} />
                        </Link>
                        <div className="tag-saleoff text-center">
                            -{book.discount * 100}%
                        </div>
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-title">
                        <Link className="text-container" to={`/products/${book.id}`}>{book.title}</Link>
                    </div>
                    <div className="product-price">
                        <span className="current-price">{book.salePrice.toLocaleString()}₫</span>
                        <span className="original-price"><s>{book.price.toLocaleString()}₫</s></span>
                    </div>
                </div>
            </div>
        )
    })

    const category_items = categories?.map(category => {
        return (
            <li key={category.id}>
                <label>
                    <input type='checkbox' />
                    <span>{category.name}</span>
                </label>
            </li>
        )
    })

    const handlePrice = (e) => {
        const minValue = Number(e.target.dataset.min)
        const maxValue = Number(e.target.dataset.max)
        if (minValue && maxValue)
        {
            navigate(`/collections/${id}?min=${minValue}&max=${maxValue}${page ? `&page=${page}` : ''}`)
        }
        else if (minValue)
        {
            navigate(`/collections/${id}?min=${minValue}${page ? `&page=${page}` : ''}`)
        }
        else if (maxValue)
        {
            navigate(`/collections/${id}?max=${maxValue}${page ? `&page=${page}` : ''}`)
        }
        else
        {
            navigate(`/collections/${id}${page ? `?page=${page}` : ''}`)
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [id, page, window.location.search])

    useEffect(() => {
        setPage(1)
    }, [id])
    return (
        <>
            <Breadscrumb />
            <div id='PageContaner'>
                <section id='collection-wrapper'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className='collection-sidebar-wrapper'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                            Danh Mục Sản Phẩm
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                                        <div className='panel'>
                                                            <ul className='no-bullets'>
                                                                <li>
                                                                    <Link to={`/collections/all`}>TẤT CẢ SẢN PHẨM</Link>
                                                                </li>
                                                                {collection_items}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                            Khoảng Giá
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                                                        <div className='panel'>
                                                            <ul className='no-bullets'>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' name='price-filter'></input>
                                                                        <span>Tất cả</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' data-max='10000' name='price-filter'></input>
                                                                        <span>Nhỏ hơn 10,000₫</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' data-min='10000' data-max='20000' name='price-filter'></input>
                                                                        <span> Từ 10,000₫ - 20,000₫</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' data-min='20000' data-max='30000' name='price-filter'></input>
                                                                        <span>Từ 20,000₫ - 30,000₫</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' data-min='30000' data-max='40000' name='price-filter'></input>
                                                                        <span> Từ 30,000₫ - 40,000₫</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} data-min='40000' data-max='50000' type='radio' name='price-filter'></input>
                                                                        <span>Từ 40,000₫ - 50,000₫</span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        <input onClick={handlePrice} type='radio' data-min='50000' name='price-filter'></input>
                                                                        <span>Lớn hơn 50,000₫</span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                            Thể Loại
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                                                        <div className='panel'>
                                                            <ul className='no-bullets'>
                                                                {category_items}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-9'>
                                <div className='collection-content-wrapper'>
                                    <div className='collection-head'>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <div className='collection-title'>
                                                    <h3>{curCollection ? curCollection.name : "TẤT CẢ SẢN PHẨM"}</h3>
                                                </div>
                                            </div>
                                            <div className='col-lg-6'>
                                                <div className='collection-sorting-wrapper'>
                                                    <div className="form-horizontal text-right">
                                                        <label htmlFor="SortBy">Sắp xếp</label>
                                                        <select name="SortBy" id="SortBy">
                                                            <option value="manual">Tùy chọn</option>
                                                            <option value="best-selling">Bán chạy nhất</option>
                                                            <option value="title-ascending">Tên A-Z</option>
                                                            <option value="title-descending">Tên Z-A</option>
                                                            <option value="price-ascending">Giá tăng dần</option>
                                                            <option value="price-descending">Giá giảm dần</option>
                                                            <option value="created-descending">Mới nhất</option>
                                                            <option value="created-ascending">Cũ nhất</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='collection-body'>
                                        <div className='row'>
                                            {book_items}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} setCurrentPage={setCurrentPage} />
        </>
    )

}

export default BooksByCollection