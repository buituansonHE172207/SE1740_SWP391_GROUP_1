import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { getBookById } from "../../service/BookService";
import { getAllPublishers } from "../../service/PublisherService";
import { getAllCollections } from "../../service/CollectionService"
import { useNavigate, useParams } from "react-router-dom";
import { getAllAuthors } from "../../service/AuthorService";
import Ckeditor from "../ckeditor/Ckeditor";
import { getAllLanguages } from "../../service/LanguageService";
import { updateBook } from "../../service/BookService";

const ProductSingle = () => {
    const [data, setData] = useState([])
    const [publishers, setPublishers] = useState([])
    const [collections, setCollections] = useState([])
    const [authors, setAuthors] = useState([])
    const [languages, setLanguages] = useState([])
    const { productId } = useParams()
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getBookById(productId).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })

        getAllPublishers().then(res => {
            setPublishers(res.data)
        }).catch(err => {
            console.log(err)
        })

        getAllCollections().then(res => {
            setCollections(res.data)
        }
        ).catch(err => {
            console.log(err)
        })

        getAllAuthors().then(res => {
            setAuthors(res.data)
        }
        ).catch(err => {
            console.log(err)
        })

        getAllLanguages().then(res => {
            setLanguages(res.data)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleDescriptionChange = (e, editor) => {
        const editorData = editor.getData();
        setData({ ...data, description: editorData });
    }


    const handleObjectChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: {
                ...data[name],
                name: value
            }
        });
    }

    const handleMultipleObjectChange = (e, objects) => {
        const { value } = e.target;
        setData({
            ...data, [e.target.name]: value.map(name => {
                return objects.find(object => object.name === name)
            })
        });
    }

    const handleImgChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: [{
                ...data[name][0],
                link: value
            }]
        });
    }

    const handleCancel = () => {
        navigate("/products")
    }

    const handleSave = () => {
        try {
            if( parseInt(data.price) < 0 || parseInt(data.page) < 0 || parseInt(data.stock) < 0 || parseInt(data.weight) < 0 || parseFloat(data.discount) < 0 || parseFloat(data.discount) > 1){
                setError(true)
                return
            }

            if (data.title.trim() === '' || data.isbn.trim() === '' || data.size.trim() === '' || data.cover.trim() === '') {
                setError(true)
                return
            }

            setData({
                ...data, price: parseInt(data.price),
                page: parseInt(data.page),
                stock: parseInt(data.stock),
                weight: parseInt(data.weight),
                discount: parseFloat(data.discount)
            })
        }
        catch (err) {
            setError(true)
            return
        }
        updateBook(data).then(res => {
            navigate("/products")
        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <div className="single">
            <Sidebar />
            {data.length !== 0 && <div className="singleContainer">
                <Navbar />
                <div className="wrapper">
                    <div className="function spacing">
                        <h3>Update product</h3>
                        <div className="btn-list">
                            {error && <span style={{color: 'red', marginRight: '20px'}}>Error</span>}
                            <button onClick={handleCancel} className="cancel">Cancel</button>
                            <button onClick={handleSave} className="save">Save</button>
                        </div>
                    </div>

                    <Box className="spacing"
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" name="title" onChange={handleInputChange} value={data.title} label="Title" variant="standard" />
                    </Box>


                    <Ckeditor className='spacing' name={'Description'} editorData={data.description || ''} setEditorData={handleDescriptionChange} />
                    <Grid container spacing={2} className="spacing">
                        <Grid item xs={4}>
                            <Box sx={{ maxWidth: 250 }} className='spacing'>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Publisher
                                    </InputLabel>
                                    <NativeSelect
                                        value={data.publisher.name}
                                        onChange={handleObjectChange}
                                        name="publisher"
                                    >
                                        {
                                            publishers.map(publisher => (
                                                <option key={publisher.id} value={publisher.name}>{publisher.name}</option>
                                            ))
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Collections</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name="collections"
                                    multiple
                                    value={data.collections.map(collection => collection.name)}
                                    onChange={(e) => handleMultipleObjectChange(e, collections)}
                                    input={<OutlinedInput id="select-multiple-chip" label="Collections" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {
                                        collections.map(collection => (
                                            <MenuItem key={collection.id} value={collection.name}>{collection.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="multiple-chip-label">Authors</InputLabel>
                                <Select
                                    labelId="multiple-chip-label"
                                    id="multiple-chip"
                                    name="authors"
                                    multiple
                                    value={data.authors.map(author => author.name)}
                                    onChange={(e) => handleMultipleObjectChange(e, authors)}
                                    input={<OutlinedInput id="multiple-chip" label="Authors" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >

                                    {
                                        authors.map(author => (
                                            <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <Box className="spacing"
                                component="form"
                                sx={{
                                    '& > :not(style)': { width: '30ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" name="isbn" onChange={handleInputChange} value={data.isbn} label="ISBN" variant="standard" />
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box className="spacing"
                                component="form"
                                sx={{
                                    '& > :not(style)': { width: '30ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" placeholder="Image link" name="images" onChange={handleImgChange} value={data?.images[0]?.link} label="Image" variant="standard" />
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box sx={{ maxWidth: 250 }} className='spacing'>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Publisher
                                    </InputLabel>
                                    <NativeSelect
                                        value={data.language.name}
                                        onChange={handleObjectChange}
                                        name="language"
                                    >
                                        {
                                            languages.map(language => (
                                                <option key={language.id} value={language.name}>{language.name}</option>
                                            ))
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="standard-number"
                                label="Page"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="page"
                                onChange={handleInputChange}
                                value={data.page}
                                error={data.page < 0}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="standard-number"
                                label="Stock"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="stock"
                                onChange={handleInputChange}
                                value={data.stock}
                                error={data.stock < 0}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="standard-number"
                                label="Weight"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="weight"
                                onChange={handleInputChange}
                                value={data.weight}
                                error={data.weight < 0}
                                placeholder="Weight in gram"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="standard-number"
                                label="Discount"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="discount"
                                onChange={handleInputChange}
                                value={data.discount}
                                error={data.discount < 0 || data.discount > 1}
                                placeholder="Ex: 0.1 for 10% discount"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="standard-number"
                                label="Price"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="price"
                                onChange={handleInputChange}
                                value={data.price}
                                error={data.price < 0}
                                placeholder="Ex: 10000"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                className="spacing"
                                id="standard-number"
                                label="Size"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="size"
                                onChange={handleInputChange}
                                value={data.size}
                                error={data.size < 0}
                                placeholder="Ex: 11.3x17.6 cm"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                className="spacing"
                                id="standard-number"
                                label="Cover type"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                name="cover"
                                onChange={handleInputChange}
                                value={data.cover}
                                error={data.cover < 0}
                                placeholder="Ex: Bìa cứng"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>}
        </div>
    );
};

export default ProductSingle;
