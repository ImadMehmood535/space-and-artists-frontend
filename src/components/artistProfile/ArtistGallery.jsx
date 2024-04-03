import React, { Fragment, useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import axios from 'axios';
import { baseUrl, headers, notificationError } from '../../common/constants';

const ArtistGallery = ({ profile }) => {
  const [gallery, setGallery] = useState([]);

  const getUserGallery = async (id) => {
    try {
      const res = await axios.get(`gallery/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        let data = [];
        res.data.map((list, i) => {
          data[i] = {
            ...list,
            src: list.file_name,
            thumbnail: list.file_name,
            thumbnailWidth: '32%',
            thumbnailHeight: 100,
          };
        });
        setGallery(data);
      }
    } catch (error) {
      // notificationError('Artist Gallery', 'Something went wrong, Please try again!');
    }
  };

  useEffect(() => {
    if (profile.id) getUserGallery(profile.id);
  }, [profile]);

  return (
    <Fragment>
      <div className='ArtistPortGallery DBlock'>
        <div className='TitlePort DBlock h-auto'>
          <p>Check Gallery</p>
        </div>
        <div className='AccordionGallery DBlock'>
          <div className='ScrollDiv DBlock'>
            {gallery && gallery.length > 0 ? (
              <Gallery images={gallery} />
            ) : (
              <div className='DFlex justify-content-center h-100'>
                <h3>This artist has no pictures to show</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ArtistGallery;
