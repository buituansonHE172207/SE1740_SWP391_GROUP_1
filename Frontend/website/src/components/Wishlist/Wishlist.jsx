import React, { useState, useEffect } from 'react'
import Breadscrumb from '../Breadscrumb'
import { Col, Container, Row } from 'react-bootstrap'
import { getWishlistByUserId, deleteWishList } from '../../services/WishlistService'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const Wishlist = ({ cart }) => {
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        const fetchWishlist = async () => {
            const res = await getWishlistByUserId(cart?.user?.id)
            setWishlist(res.data)
        }
        cart?.user?.id && fetchWishlist()
    }, [cart])

    const deleteWishlist = (id) => {
        deleteWishList(cart?.user?.id, id).then(res => {
            const newWishlist = wishlist.filter(item => item.book.id !== id)
            setWishlist(newWishlist)
        })
    }

    return (
        <div>
            <Breadscrumb label={'Wishlist'} />
            <div id="PageContainer">
                <main className='main-content'>
                    <div id="page-wrapper">
                        <Container>
                            <h5>Wishlist</h5>
                            <hr className='hr--small' />
                            <div className='wishlist-content'>
                                {wishlist?.length === 0 && <h5>Wishlist của bạn trống</h5>}
                                <Row>
                                    {wishlist && wishlist?.map((item, index) => (
                                        <Col md={3} key={item.id} className='mb-4'>
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="fit-content"
                                                        image={item.book.images[0].link}
                                                        alt="green iguana"
                                                        
                                                    />
                                                    <CardContent >
                                                        <Typography gutterBottom component="div" fontSize={'14px'} className='text-container'>
                                                            {item.book.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <div className='d-flex justify-content-between'>
                                                                <span className='current-price'>{item.book.salePrice.toLocaleString()}₫</span>
                                                                <i onClick={() => deleteWishlist(item.book.id)} className="fa-solid fa-x" style={{color: '#d70f0f'}}></i>
                                                            </div>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Col>

                                    ))}
                                </Row>
                            </div>
                        </Container>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Wishlist