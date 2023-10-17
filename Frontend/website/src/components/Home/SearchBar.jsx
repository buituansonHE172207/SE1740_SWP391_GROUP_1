import React, {useState, useEffect} from 'react'
import { getBooksBySearchValue } from '../../services/BookService'
const SearchBar = ({setResult}) => {
    const [input, setInput] = useState('')
    

    const handleChange = (e) => {
        setInput(e.target.value)
        fetchData(e.target.value)
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchData(input);
        }, 300); 

        return () => {
            clearTimeout(delay);
        };
    }, [input]);

    const fetchData = (value) => {
        if (value === '') {
            setResult({})
            return
        }
        getBooksBySearchValue(value).then(res => {
            setResult(res.data)
        })
    }

    const redirectSearch = () => {
        window.location.href = `/search/${input}`
    }
    return (
        <div className="input-group rounded">
            <input type="text" onChange={handleChange} value={input} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button className="search-btn">
                <span className="input-group-text border-0" id="search-addon">
                    <i onClick={redirectSearch} className="fas fa-search"></i>
                </span>
            </button>
        </div>
    )
}

export default SearchBar