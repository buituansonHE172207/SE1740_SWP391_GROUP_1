import React from "react";
import ListProduct from "./ListProduct";
import Slider from "./Slider";
const Home = () => {
    return (
        <div>
            <Slider/>
            <ListProduct title="SÁCH MỚI" query="sorted-and-paged?sortBy=sold&page=0&size=5" />
            <ListProduct title="SÁCH BÁN CHẠY" query="sorted-and-paged?sortBy=sold&page=0&size=5&sortOrder=desc" />
            <ListProduct title="MANGA - COMIC" query="sorted-and-paged/by-collection?size=5&collection=6" />
            <ListProduct title="DORAEMON" query="sorted-and-paged/by-collection?size=5&collection=27" />
        </div>
    )
}

export default Home