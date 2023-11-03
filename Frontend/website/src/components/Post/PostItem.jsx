import React from 'react'
import Card from 'react-bootstrap/Card';

const formatDate =  (inputDate) => {
  var date = new Date(inputDate);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();


  return day + '/' + month + '/' + year;
}

const PostItem = ({data}) => {
    // console.log(data)
  return (
    <Card style={{marginBottom: '30px'}}>
      <a style={{height: '315px'}} href={`blog-detail/${data.id}`}><Card.Img style={{height: 'inherit'}} variant="top" src={data.thumbnail} /></a>
      <Card.Body style={{height: '142px'}}>
        <div className='post-info'>
          <div className="post-date me-3">
            <i class="fa fa-calendar me-1" aria-hidden="true"></i>
            <span>{formatDate(data.createdAt)}</span>
          </div>
          <div className="post-author">
            <i class="fa-solid fa-user me-1"></i>
            <span>{data.user.fullName}</span>
          </div>
        </div>
        <a className='post-title' href={`/blog-detail/${data.id}`}><Card.Title style={{marginTop: '5px' }}><div className='text-container' style={{fontSize: '14px', padding: '2px', height: '38px'}}>{data.title}</div></Card.Title></a>
        <Card.Text>
          <span className='post-brief'>{data.brief}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostItem