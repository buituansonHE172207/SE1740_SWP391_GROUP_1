import React from "react";
import CollectionHeader from "./CollectionHeader";
const Breadscrumb = ({label}) => {
    return (
        <>
            <section id="breadscrumb-wrapper5" className="breadscrumb-w-img">
                <img src="/img/383841571_682128593831169_1939699308685999145_n.png"></img>
                <CollectionHeader/>
                <div className="breadcrumb-content">
                    <div className="breadcrumb-content">
                        <div className="container">
                            <div className="breadcrumb-big">
                                <h2>{label}</h2>
                            </div>
                            <div className="breadcrumb-small">
                                <a href="/" title="Trang chủ">Trang chủ</a>
                                <span>/{label}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        
    )
}

export default Breadscrumb