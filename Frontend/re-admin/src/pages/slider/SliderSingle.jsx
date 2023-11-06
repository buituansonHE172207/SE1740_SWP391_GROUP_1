import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { updateSlider, getSliderById } from '../../service/SliderService';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
const SliderSingle = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [error, setError] = useState(false)

    const handleCancel = () => {
        window.location.replace("/sliders")
    }

    const handleSave = () => {
        updateSlider(data).then(res => {
            if (res.status === 200) {
                window.location.replace("/sliders")
            }
            else {
                setError(true)
            }
        })
    }

    useEffect(() => {
        getSliderById(id).then((res) => {
            setData(res.data)
        })
    }, [])

    return (
        <div>
            <div className="single">
                <Sidebar />
                {data.length !== 0 && <div className="singleContainer">
                    <Navbar />
                    <div className="wrapper">
                        <div className="function spacing">
                            <h3>Update Sliders</h3>
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
                                    id="description"
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="url"
                                    name="url"
                                    label="URL"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.imageUrl}
                                    onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="backlink"
                                    name="backlink"
                                    label="Back Link"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.backLink}
                                    onChange={(e) => setData({ ...data, backLink: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default SliderSingle