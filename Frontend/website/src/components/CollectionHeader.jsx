import React, {useMemo} from "react";
import { getCollections } from "../services/CollectionService"
import { getAllPostCategories } from "../services/PostService";
import { Link } from "react-router-dom";
const CollectionHeader = () => {

    const [collections, setCollections] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const fetchData = () => {
        getCollections()
            .then(response => {
                setCollections(response.data)
            })
            .catch(error => {
                console.error("Error fetching collections data: ", error)
            })
        getAllPostCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error("Error fetching categories data: ", error)
            })
    }

    const collection_item = () => {
        return collections.map(collection => {
            if (collection.isDisplay) {
                return <Link style={{ fontSize: '15px' }} to={`/collections/${collection.id}`} key={collection.id}>
                    {collection.name}
                </Link>
            }
        })
    }

    const category_item = () => {
        return categories.map(category => {       
            return <Link style={{ fontSize: '15px' }} to={`/blogs/${category.id}`} key={category.id}>
                {category.name}
            </Link>
        })
    }

    React.useEffect(() => {
        fetchData();
    }, [])


    return (
        <div id="megamenu-wrapper" className="medium--hide small-hide">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 megamenu-nav-wrapper">
                        <div className="dropdown">
                            <button className="dropbtn">
                                <i className="fa-solid fa-bars"></i>
                                Danh Mục Sản Phẩm
                            </button>
                            <div className="dropdown-content">
                                <Link style={{ fontSize: '15px' }} to={`/collections/all`}>Tất cả sản phẩm</Link>
                                {collection_item}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="dropdown">
                            <button className="dropbtn-white">
                                Tin tức
                                <i style={{marginLeft: '5px'}} class="fa-solid fa-angle-down"></i>
                            </button>
                            <div className="dropdown-content">
                                {category_item}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionHeader