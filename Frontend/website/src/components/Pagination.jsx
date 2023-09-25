import React from 'react'
const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    const [currentPage, setCurrentPageState] = React.useState(1);
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

  return (
    <div>
        <div id='pagination' className='text-center'>
            {
                pages.map((page, index) => {
                    return <span key={index} onClick={() => {setCurrentPage(page); setCurrentPageState(page)}} className={`page ${page === currentPage ? 'current' : ''}`}>{page}</span>
                })
            }
        </div>
        
    </div>
  )
}

export default Pagination