import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const NextArrow = ({ className, style, onClick }) => {
    return (
        <HiArrowRight
            color="#000"
            className={className}
            style={{
                display: "block",
                background: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                padding: "10px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                marginRight: "10px",
                zIndex: 1000,
            }}
            onClick={onClick}
        />
    );
};

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <HiArrowLeft
            color="#000"
            className={className}
            style={{
                display: "block",
                background: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                padding: "10px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                marginLeft: "10px",
                zIndex: 1000,
            }}
            onClick={onClick}
        />
    );
};

export const Carousel = ({ items, slides, show, reverse }) => {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: show,
        slidesToScroll: slides,
        autoplay: false,
        rtl: reverse,
        swipe: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return <Slider {...settings}>{items}</Slider>;
};
