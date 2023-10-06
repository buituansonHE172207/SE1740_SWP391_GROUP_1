import React from 'react'
import { paginationRange } from '../utils/appUtils';
const Pagination = (props) => {
    let array = paginationRange(props.totalPage, props.page, props.limit, props.siblings)
    return (
        <div>
            <ul id='pagination' className='pagination pagination-md justify-content-center'>
                <li onClick={() => {props.setCurrentPage('&laquo;')}} className="page page-item"><span className="page-link">&laquo;</span></li>
                <li onClick={() => {props.setCurrentPage('&lsaquo;')}} className="page page-item"><span className="page-link">&lsaquo;</span></li>
                {
                    array.map((value, i) =>
                        <li key={i} onClick={() => props.setCurrentPage(value)} className={value === props.page ? "page page-item active page-link" : "page page-item page-link"}><span className="">{value}</span></li>
                    )
                }
                <li onClick={() => {props.setCurrentPage('&rsaquo;')}} className="page page-item"><span className="page-link">&rsaquo;</span></li>
                <li onClick={() => {props.setCurrentPage('&raquo;')}} className="page page-item"><span className="page-link">&raquo;</span></li>
            </ul>
        </div>


    )
}

export default Pagination