import React from "react";
import ListProduct from "./ListProduct";
import Slider from "./Slider";
const Home = () => {
    return (
        <div>
            <Slider/>
            <ListProduct title="SÁCH MỚI" query="sorted-and-paged?sortBy=sold&page=0&size=5" />
            <ListProduct title="SÁCH BÁN CHẠY" query="sorted-and-paged?sortBy=sold&page=0&size=5&sortOrder=desc" />
        </div>
    )
}

export default Home