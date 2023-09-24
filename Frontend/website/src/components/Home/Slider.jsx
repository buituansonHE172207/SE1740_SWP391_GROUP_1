import React from "react";
import { getSlider } from "../../services/SliderService";

const Slider = () => {
    const [sliders, setSliders] = React.useState([]);

    const fetchData = () => {
        getSlider()
            .then(response => {
                setSliders(response.data);
            })
            .catch(error => {
                console.error("Error fetching sliders data:", error);
            });
    };

    const slider_item = sliders.map(slider => {
        return (
            <div
                key={slider.id}
                className={`carousel-item ${slider.id === 1 ? "active" : ""}`}
                data-bs-interval="3000"
            >
                <img src={slider.imageUrl} className="d-block w-100" alt={`Slide ${slider.id}`} />
            </div>
        )
    })

    React.useEffect(() => {
        console.log(sliders)
        fetchData();
    }, [])

    return (
        <div className="main-slider">
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {slider_item}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div id="megamenu-wrapper" className="medium--hide small-hide">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 megamenu-nav-wrapper">
                            <div class="dropdown">
                                <button class="dropbtn">
                                    <i class="fa-solid fa-bars"></i>
                                    
                                </button>
                                <div class="dropdown-content">
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Slider