import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { updateAuthor, getAuthorById } from '../../service/AuthorService';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
const AuthorSingle = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  const [error, setError] = useState(false)

  const handleCancel = () => {
    window.location.replace("/authors")
  }

  const handleSave = () => {
    updateAuthor(data).then(res => {
      if (res.status === 200) {
        window.location.replace("/authors")
      }
      else {
        setError(true)
      }
    })
  }

  useEffect(() => {
    getAuthorById(id).then((res) => {
      setData(res.data)
    })
  }, [])
  console.log(data)

  return (
    <div>
      <div className="single">
        <Sidebar />
        {data.length !== 0 && <div className="singleContainer">
          <Navbar />
          <div className="wrapper">
            <div className="function spacing">
              <h3>Update Author</h3>
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
                  id="name"
                  name="name"
                  label="Title"
                  fullWidth
                  autoComplete="off"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="company"
                  name="company"
                  label="Company"
                  fullWidth
                  autoComplete="off"
                  value={data.company || ''}
                  onChange={(e) => setData({ ...data, company: e.target.value })}
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

export default AuthorSingle