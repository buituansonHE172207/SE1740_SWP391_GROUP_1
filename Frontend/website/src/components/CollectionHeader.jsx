import React from "react";
import { getCollections } from "../services/CollectionService"
import { Link } from "react-router-dom";
const CollectionHeader = () => {
    
    const [collections, setCollections] = React.useState([])
    const fetchData = () => {
        getCollections()
            .then(response => {
                setCollections(response.data)
            })
            .catch(error => {
                console.error("Error fetching collections data: ", error)
            })
    }

    const collection_item = collections.map(collection => {
        if (collection.isDisplay)
        {
            return <Link to={`/collections/${collection.id}`} key={collection.id}>
                {collection.name}
            </Link>
        }
    })

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
                                   <Link to={`/collections/all`}>Tất cả sản phẩm</Link>
                                    {collection_item}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            
                        </div>
                    </div>
                </div>
            </div>
    )   

    
}

export default CollectionHeader