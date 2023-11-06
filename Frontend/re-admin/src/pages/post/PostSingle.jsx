import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { updatePost, getPostById, getAllPostCategories } from '../../service/PostService';
import { FormControl, InputLabel, NativeSelect, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Ckeditor from "../ckeditor/Ckeditor";

const PostSingle = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState([])

    const handleCancel = () => {
        window.location.replace("/posts")
    }

    const handleSave = () => {
        updatePost(data).then(res => {
            if (res.status === 200) {
                window.location.replace("/posts")
            }
            else {
                setError(true)
            }
        })
    }

    useEffect(() => {
        getPostById(id).then((res) => {
            setData(res.data)
        })
        getAllPostCategories().then(res => {
            setCategories(res.data)
        })
    }, [])

    const handleObjectChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: {
                id: value
            }
        });
    }

    const handleContentChange = (e, editor) => {
        const editorData = editor.getData();
        setData({ ...data, content: editorData });
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
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Category
                                        </InputLabel>
                                        <NativeSelect
                                            value={data?.category?.id || ''}
                                            onChange={handleObjectChange}
                                            name="category"
                                        >
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

export default PostSingle