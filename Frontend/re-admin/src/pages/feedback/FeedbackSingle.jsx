import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getFeedbackById, answerFeedback } from '../../service/FeedbackService';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import Textarea from '@mui/joy/Textarea';
const FeedbackSingle = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [error, setError] = useState(false)

    const handleCancel = () => {
        window.location.replace("/feedbacks")
    }

    const handleSave = () => {
        answerFeedback(data).then((res) => {
            window.location.replace("/feedbacks")
        })
    }

    useEffect(() => {
        getFeedbackById(id).then((res) => {
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
                            <h3>Answer Feedback</h3>
                            <div className="btn-list">
                                {error && <span style={{ color: 'red', marginRight: '20px' }}>Error</span>}
                                <button onClick={handleCancel} className="cancel">Cancel</button>
                                <button onClick={handleSave} className="save">Save</button>
                            </div>
                        </div>

                        <Grid container spacing={2} className='spacing'>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled
                                    id="comment"
                                    name="comment"
                                    label="Comment"
                                    fullWidth
                                    autoComplete="off"
                                    value={data.comment}
                                    onChange={(e) => setData({ ...data, comment: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Respond</Form.Label>
                                    <div>
                                        <Form.Control style={{fontSize: '16px'}} name="answer" id="answer" as="textarea" rows={3} value={data.answer} onChange={(e) => setData({ ...data, answer: e.target.value })} />
                                    </div>
                                </Form.Group>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default FeedbackSingle