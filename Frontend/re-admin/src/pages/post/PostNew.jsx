import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { createPost, getPostById, getAllPostCategories } from '../../service/PostService';
import { FormControl, InputLabel, NativeSelect, Box } from '@mui/material';
import { getUserInfoByEmail } from '../../service/UserService';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Ckeditor from "../ckeditor/Ckeditor";

const PostNew = ({currentUser}) => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        title: "",
        content: "",
        category: {
            id: ""
        },
        brief: "",
        thumbnail: "",
        user: {
            id: ""
        }
    })

    useEffect(() => {
        getAllPostCategories().then((res) => {
            setCategories(res.data)
        })
        getUserInfoByEmail(currentUser.sub)
        .then((res) => setData({...data, user: {id: res.data.id}}))
    }, [])

    const handleObjectChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: {
                id: Number(value)
            }
        });
    }

    const handleContentChange = (e, editor) => {
        const editorData = editor.getData();
        setData({ ...data, content: editorData });
    }
    const handleCancel = () => {
        window.location.replace("/posts")
    }

    const handleSave = () => {
        createPost(data).then(() => {
            window.location.replace("/posts")
        })
        .catch(() => {
            setError(true)
        })
    }
  return (
    <div>
        <div className="single">
                <Sidebar />
                {data.length !== 0 && <div className="singleContainer">
                    <Navbar />
                    <div className="wrapper">
                        <div className="function spacing">
                            <h3>Update Posts</h3>
                            <div className="btn-list">
                                {error && <span style={{ color: 'red', marginRight: '20px' }}>Error</span>}
                                <button onClick={handleCancel} className="cancel">Cancel</button>
                                <button onClick={handleSave} className="save">Save</button>
                            </div>
                        </div>

                        <Grid container spacing={2} className='spacing'>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="brief"
                                    name="brief"
                                    label="Brief"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.brief}
                                    onChange={(e) => setData({ ...data, brief: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="thumbnail"
                                    name="thumbnail"
                                    label="Thumbnail"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.thumbnail}
                                    onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box sx={{ maxWidth: 250 }} className='spacing'>
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            value={data?.category?.id || ''}
                                            onChange={handleObjectChange}
                                            name="category"
                                        >
                                            <option>--Select category--</option>
                                            {
                                                categories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))
                                            }
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Ckeditor className='spacing' name={'Description'} editorData={data.content || ''} setEditorData={handleContentChange} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                }
            </div>
    </div>
  )
}

export default PostNew