import React, { useEffect, useState } from 'react'
import Breadscrumb from '../Breadscrumb'
import { Container, Grid } from '@mui/material'
import { getAllPostCategories } from '../../services/PostService';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getPostByCategory } from '../../services/PostService';
import Pagination from '@mui/material/Pagination';
import PostItem from './PostItem';
const Post = () => {
    const [searchParams, ] = useSearchParams()
    const [categories, setCategories] = React.useState([])
    const [page, setPage] = useState(searchParams.get('page') || 1)
    const [posts, setPosts] = useState([])
    const { id } = useParams()
    useEffect(() => {
        getAllPostCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error("Error fetching categories data: ", error)
            })
    }, [])
    
    useEffect(() => {
        getPostByCategory(id, page)
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                console.error("Error fetching posts data: ", error)
            })
    }, [id, page])

    console.log(posts)

    const handleChange = (event, value) => {
        setPage(value);
    }

    return (
        <div>
            <Breadscrumb label={'Bài viết'} />
            <div id="PageContainer" style={{marginTop: '3%'}}>
                <main className="main-content">
                    <section id="blog-wrapper">
                        <Container maxWidth='lg'>
                            <Grid container spacing={3}>
                                <Grid item md={3}>
                                    <div className="blog-sidebar">
                                        <div className="list-categories">
                                            <div className="blog-sb-title">
                                                <h4>Danh mục tin tức</h4>
                                            </div>
                                            <ul className="no-bullet" style={{marginTop: '58px'}}>
                                                {
                                                    categories?.map(category => (
                                                        <li key={category.id} className={id == category.id ? 'active' : ''}>
                                                            <a href={`/blogs/${category.id}`} >{category.name}</a>
                                                        </li>                                                  
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={9}>
                                    <div className="blog-content">
                                        <div className="blog-content-wrapper">
                                            <div className="blog-head">
                                                <div className="blog-title">
                                                    <h3>{categories?.map(category => (category.id == id && category.name))}</h3>
                                                </div>
                                            </div>
                                            <div className="blog-body">
                                                <Grid container spacing={2}>
                                                    {
                                                        posts?.content?.map((data) => (
                                                            <Grid item md={6} key={data.id}>
                                                                <PostItem data={data} />
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Pagination style={{marginBottom: '20px'}} page={page} onChange={handleChange} count={posts.totalPages} variant="outlined" color="secondary" />
                        </Container>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Post