// src/app/portfolio/project/page.jsx

'use client'; // Diese Direktive macht diese Datei zu einer Client-Komponente

import React, { useEffect } from 'react';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import HolographicCard from '../../components/HolographicCard/HolographicCard';
import HeroImage from "../../components/HeroImage/HeroImage";
import Image from 'next/image';

const SingleCard = () => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      infinite: false,
      toolbar: true,
      arrows: true,
    });

    return () => Fancybox.destroy();
  }, []);

  return (
    <>
      <div className="section_project_header">


      {/* Hero-Bild mit Overlay für die About-Seite */}
      <HeroImage 
        imageSrc="/assets/img/LandingBG/OniGirl11.jpg" 
        altText="Oni Girl Background" 
      />

        <div className="project-hero_container">
          <div className="card-grid2">
            <HolographicCard
              imgSrc="/assets/img/LandingBG/OniGirl10.jpg"
              category="Coding"
              rarity="radiant"
            />
          </div>

          <div className="project_hero_blurb_container">
            <h1 className="heading-1">My First Project</h1>
            <h4 className="heading-4">2024</h4>
            <p className="bio-paragraph">
              Short Description ...
            </p>
          </div>
        </div>
      </div>

      <div className="gallery">
        {[
          "New1.jpeg",
          "New2.jpeg",
          "New3.jpeg",
          "New4.jpg",
          "New5.jpeg",
          "New6.jpeg",
          "New7.jpg",
          "redsword-img.png",
        ].map((image, index) => (
          <a
            key={index}
            data-fancybox="gallery"
            href={`/assets/img/reduced_images/${image}`}
          >
            <Image
              src={`/assets/img/reduced_images/${image}`}
              alt={`Thumbnail ${index + 1}`}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default SingleCard;
