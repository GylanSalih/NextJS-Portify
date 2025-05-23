"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './carousel.css';

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const autoplayTimer = useRef(null);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);

  const slides = [
    { 
      id: 1, 
      type: 'video', 
      src: '/assets/videos/sea.mp4', 
      title: "Welcome!",  
      subtitle: "Thank you for your curiosity", 
      description: "Hey, great to have you here! I'm currently working on the website, and I appreciate your interest. There's a lot to be done, but I'm excited for you to see the progress." 
    },
    { 
      id: 2, 
      type: 'image',  
      src: '/assets/img/LandingBG/OniBoy1.webp', 
      title: "So much chaos?",  
      subtitle: "Is this the final design?", 
      description: "No! This site is a work in progress, and it's being crafted with love. Stay tuned for the exciting changes ahead, and follow me on GitHub to make sure you don't miss out!" 
    },
  ];
  
  
  
  const autoplayInterval = 7500;

  const startAutoplay = () => {
    autoplayTimer.current = setInterval(() => {
      setActiveSlide(prev => (prev === slides.length ? 1 : prev + 1));
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayTimer.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleSwipeStart = (e) => {
    if (e.type === 'touchstart') {
      setStartX(e.touches[0].pageX);
      setStartY(e.touches[0].pageY);
    } else {
      setStartX(e.pageX);
      setStartY(e.pageY);
    }
    stopAutoplay();
  };

  const handleSwipeEnd = (e) => {
    if (e.type === 'touchend') {
      setEndX(e.changedTouches[0].pageX);
      setEndY(e.changedTouches[0].pageY);
    } else {
      setEndX(e.pageX);
      setEndY(e.pageY);
    }

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        setActiveSlide((prev) => (prev === 1 ? slides.length : prev - 1));
      } else if (diffX < -50) {
        setActiveSlide((prev) => (prev === slides.length ? 1 : prev + 1));
      }
    }

    startAutoplay();
  };

  return (
    <div
      className="carousel-wrapper"
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
      onMouseDown={handleSwipeStart}
      onMouseUp={handleSwipeEnd}
    >
      <div className="slide-wrapper">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className={`slide ${activeSlide === slide.id ? 'active' : ''}`}
            data-slide={slide.id}
          >
            <div className="slide-content">
              {slide.type === 'image' && (
                <img
                  className="slide-media"
                  src={slide.src}
                  alt={`Slide ${slide.id}`}
                  loading={activeSlide === slide.id ? 'eager' : 'lazy'}
                />
              )}
              {slide.type === 'video' && (
                <video
                  className="slide-media"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={slide.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {slide.type === 'gif' && (
                <img
                  className="slide-media"
                  src={slide.src}
                  alt={`Slide ${slide.id}`}
                  loading={activeSlide === slide.id ? 'eager' : 'lazy'}
                />
              )}
              <div className="text-overlay">
                <div className="text-content-slider">
                  <p className="subtitle-slider">{slide.subtitle}</p>
                  <h1 className="title-slider">{slide.title}</h1>
                  <p className="description-slider">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        {slides.map((slide) => (
          <a
            key={slide.id}
            href="#"
            className={`nav-dot ${activeSlide === slide.id ? 'active loading' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveSlide(slide.id);
              stopAutoplay();
              startAutoplay();
            }}
          ></a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;