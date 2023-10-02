import React from "react";
import Breadscrumb from "../Breadscrumb";
import { getCollections } from "../../services/CollectionService"
import CollectionList from "./CollectionList";
import Pagination from "../Pagination";
const Collection = () => {
    const [collections, setCollections] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage, ] = React.useState(10)
    const fetchData = () => {
        getCollections()
            .then(response => {
                setCollections(response.data)
            })
            .catch(error => {
                console.error("Error fetching collections data: ", error)
            })
    }
    
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = collections.slice(firstPostIndex, lastPostIndex)

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Breadscrumb label='Collection'/>
            <CollectionList collections={currentPosts}/>
            <Pagination totalPosts={collections.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default Collection