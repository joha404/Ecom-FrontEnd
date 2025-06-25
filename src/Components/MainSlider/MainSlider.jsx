import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_1 from "./../../assets/images/slider-image-1.jpeg";
import img_2 from "./../../assets/images/slider-image-2.jpeg";
import img_3 from "./../../assets/images/slider-image-3.jpeg";
import img_5 from "./../../assets/images/slider-2.jpeg";
import img_6 from "./../../assets/images/ecommerce-development.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    appendDots: (dots) => (
      <div className="-mt-5">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-white bg-opacity-60 rounded-full hover:bg-green-500 transition-all duration-300"></div>
    ),
  };

  const slides = [
    {
      image: img_6,
      heading: "Shop the Latest Trends",
      text: "Discover exclusive deals, fresh arrivals, and premium products just for you.",
      button: "Start Shopping",
    },
    {
      image: img_2,
      heading: "Unbeatable Prices Everyday",
      text: "Enjoy massive discounts and save big on your favorite items.",
      button: "Explore Deals",
    },
    {
      image: img_5,
      heading: "New Arrivals Just Dropped",
      text: "Be the first to grab the latest in fashion, tech, and lifestyle.",
      button: "Browse Now",
    },
  ];

  return (
    <section className="w-full min-h-screen overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen w-full">
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-16 lg:px-24 text-white">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                key={index} // important for anim on slide change
              >
                <motion.h1
                  className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {slide.heading}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg mb-6 text-white/90"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {slide.text}
                </motion.p>

                <motion.button
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 text-sm sm:text-base font-semibold rounded-full shadow-lg transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.button}
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
