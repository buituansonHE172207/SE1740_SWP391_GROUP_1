import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksBySearchValue } from '../../services/BookService'
import Breadscrumb from '../Breadscrumb'
import { Container, Row, Col } from 'react-bootstrap'
const Search = () => {
    const { name } = useParams()
    const [result, setResult] = useState({})
    useEffect(() => {
        getBooksBySearchValue(name).then(res => {
            setResult(res.data)
        })
    }, [name])

    console.log(result)

    return (
        <div>
            <Breadscrumb label={'Tìm kiếm'} />
            <div id="PageContainer">
                <main className="main-content">
                    <section id="orther-section-wrapper">
                        <Container>
                            <div id="search-wrapper">
                                <h3 className='text-center'>Kết quả tìm kiếm: {name}</h3>
                            </div>
                            <div className='search-title'>
                                <h5>Sản phẩm phù hợp</h5>
                            </div>
                            <Row>
                                {
                                    result?.content ? (
                                        result.content.map(item => (
                                            <Col key={item.id} lg={3}>
                                                <div className="product-item" style={{marginBottom: '15px'}}>
                                                    <div className="product-img">
                                                        <a href={`/products/${item.id}`}>
                                                            {item.images[0] && <img src={item.images[0].link} alt={item.title} />}
                                                        </a>
                                                        {item.discount && (
                                                            <div className="tag-saleoff text-center">
                                                                -{item.discount * 100}%
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="product-info" >
                                                        <div className="product-title">
                                                            <a className="text-container" href={`/products/${item.id}`}>{item.title}</a>
                                                        </div>
                                                        <div className="product-price">
                                                            <span className="current-price">{item.salePrice.toLocaleString()}₫</span>
                                                            <span className="original-price"><s>{item.price.toLocaleString()}₫</s></span>
                                                    </div>
                                                </div>
                                                </div>
                                                
                                            </Col>
                                        ))
                                    ) : (
                                        'Không có sản phẩm nào phù hợp'
                                    )
                                }
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Search