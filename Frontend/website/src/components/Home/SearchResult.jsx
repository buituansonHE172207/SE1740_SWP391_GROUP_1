import React from 'react'

const SearchResult = ({ result }) => {
    return (
        <div id='search-smart' className='smart-search-wrapper search-wrapper'>
            <div id='product'>
                {
                    result?.content ? (
                        result.content.map(item => {
                            return <div className='search-wrapper' key={item.id}>
                                <div className='prod-img'>
                                    <a href={`products/${item.id}`}>
                                        <img src={item?.images[0]?.link} alt="image" />
                                    </a>
                                </div>
                                <div className="prod-info ms-3">
                                    <span className="prod-title">
                                        <a className='h6' style={{fontSize:'12px'}} href={`products/${item.id}`}>
                                            {item.title}
                                        </a>
                                    </span>
                                    <div className='prod-info-price mt-1'>
                                        <span className="price">
                                            {item?.salePrice?.toLocaleString()}₫
                                        </span>
                                        <span className="compare-at-price">
                                            {item?.price.toLocaleString()}₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        })
                    ) : ''
                }
            </div>
        </div>
    )
}

export default SearchResult