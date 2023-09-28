import React from "react";
import { Link } from "react-router-dom";
const CollectionList = (props) => {
    return (
        <div id="PageContainer">
                <section id="collection-wrapper">
                    <div className="container">
                        <div className="row">
                            {
                                props.collections.map(collection => 
                                    <div key={collection.id} className="col-lg-6">
                                        <div className="collection-item-tacgia">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <Link to={`${collection.id}`}><img src="./img/book_shell.png" alt="img"/></Link>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="c-author-listing--details">
                                                        <div className="c-author-listing--title">
                                                            <span className="word2 lastname">
                                                                {collection.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    
                                )
                            }
                        </div>
                    </div>
                </section>
        </div>
    )
}
export default CollectionList
