import React, { Fragment, useEffect } from 'react';
import Gallery from 'react-grid-gallery';

const UserGallery = () => {
  const BG = {
    prof1: {
      backgroundImage: "url('/assets/images/GalleryImg2.png')",
    },
    prof2: {
      backgroundImage: "url('/assets/images/GalleryImg1.png')",
    },
    prof3: {
      backgroundImage: "url('/assets/images/GalleryImg2.png')",
    },
    prof4: {
      backgroundImage: "url('/assets/images/GalleryImg3.png')",
    },
    prof5: {
      backgroundImage: "url('/assets/images/GalleryImg1.png')",
    },
  };
  const imagesGallery = [
    {
      src: '/assets/images/GalleryImg1.png',
      thumbnail: '/assets/images/GalleryImg1.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg2.png',
      thumbnail: '/assets/images/GalleryImg2.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg3.png',
      thumbnail: '/assets/images/GalleryImg3.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg1.png',
      thumbnail: '/assets/images/GalleryImg1.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg2.png',
      thumbnail: '/assets/images/GalleryImg2.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg3.png',
      thumbnail: '/assets/images/GalleryImg3.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg1.png',
      thumbnail: '/assets/images/GalleryImg1.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg2.png',
      thumbnail: '/assets/images/GalleryImg2.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
    {
      src: '/assets/images/GalleryImg3.png',
      thumbnail: '/assets/images/GalleryImg3.png',
      thumbnailWidth: '32%',
      thumbnailHeight: 100,
    },
  ];

  return (
    <Fragment>
      <div className='ArtistPortGallery DBlock'>
        <div className='TitlePort DBlock h-auto'>
          <p>Check Gallery</p>
        </div>
        <div className='AccordionGallery DBlock'>
          <div className='ScrollDiv DBlock'>
            <Gallery images={imagesGallery} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserGallery;
