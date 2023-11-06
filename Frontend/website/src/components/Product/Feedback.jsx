import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { answerFeedback } from '../../services/Feedback';
const Feedback = ({ feedback, userId, bookId }) => {

    const [comment, setComment] = React.useState('')
    console.log(feedback)
    console.log(bookId)
    const handleSend = () => {
        if (comment.trim() === '' || !userId || !bookId)
        {
            window.location.href = '/login'
            return;
        }
        const data = {
            user: {id: userId},
            book: {id: bookId},
            comment: comment,
        }
        answerFeedback(data).then(res => {
            window.location.reload()
        })
    }
    return (
        <div>
            {
                feedback?.content?.length !== 0 && feedback?.content?.map(item => (
                    <div style={{marginBottom: '10px'}} key={item.id}>
                        <div  className='d-flex mb-3'>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="img" src={"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h5 style={{ margin: 0, textAlign: "left" }}>{item.user.fullName}</h5>
                                <p style={{ textAlign: "left" }}>
                                    {item.comment}
                                </p>
                            </Grid>
                        </Grid>
                        <hr className='hr--small' />
                        </div>
                        {
                            item.state === "ANSWERED" && (
                                <div className='ml-5' style={{marginLeft: '5%'}}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item>
                                            <Avatar alt="img" src={"/img/ic_logo_small.png"} />
                                        </Grid>
                                        <Grid justifyContent="left" item xs zeroMinWidth>
                                            <h5 style={{ margin: 0, textAlign: "left" }}>Admin</h5>
                                            <p style={{ textAlign: "left" }}>
                                                {item.answer}
                                            </p>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        }
                    </div>
                    
                ))
            }
            <div>
                <TextareaAutosize value={comment} onChange={(e) => setComment(e.target.value)} style={{width: '100%', height: '110px'}} placeholder='Share your thought on this book'/>
                <div>
                    <button onClick={handleSend} className='btn btn-primary'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Feedback