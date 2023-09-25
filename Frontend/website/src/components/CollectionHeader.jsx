import React from "react";
import { getCollections } from "../services/CollectionService"

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
            return <a href="#" key={collection.id}>
            {collection.name}
        </a>
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
                                   <a href="/collections/${}">Tất cả sản phẩm</a>
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