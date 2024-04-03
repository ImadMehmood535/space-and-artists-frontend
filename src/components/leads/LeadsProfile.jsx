import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-grid-gallery';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { baseUrl, headers } from '../../common/constants';

const LeadsProfile = ({ singleArtists }) => {
  const [video, setVideo] = useState(null);
  const [gallery, setGallery] = useState([]);

  const BG = {
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
  };
  const BGArt = {
    backgroundImage: 'url("/assets/images/ProfileImgBgYellow.png")',
  };

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
            thumbnailWidth: '30%',
            thumbnailHeight: 50,
          };
        });
        setGallery(data);
      }
    } catch (error) {
      setGallery([]);
    }
  };

  useEffect(() => {
    if (singleArtists) {
      setVideo(singleArtists.youtube);
      getUserGallery(singleArtists.id);
    }
  }, [singleArtists]);

  return (
    <Fragment>
      <div className='col-lg-8 d-none d-lg-block'>
        <div className='ArtistProArea DBlock'>
          {singleArtists && singleArtists !== null ? (
            <Fragment>
              <div className='ArtistInfoDiv DFlex'>
                <div className='ArtistImgDiv DBlock'>
                  {/* <div className='ImgDiv DBlock' style={BGArt}> */}
                  <div className='ImgDiv DBlock'>
                    <img src={singleArtists.profilePicture} alt='' className='' />
                  </div>
                </div>
                <div className='ArtistTextDiv DBlock'>
                  <div className='Title DBlock'>
                    <h3>{singleArtists.firstName + ' ' + singleArtists.lastName}</h3>
                    <p>
                      <i className='fas fa-map-marker-alt icon mr-2'></i>
                      {singleArtists.cityName}, {singleArtists.countryName}
                    </p>
                  </div>
                  <div className='Description DFlex justify-content-start BB'>
                    <h5>{singleArtists.categoryParentName}</h5> <h6>{singleArtists.categoryName}</h6>
                  </div>
                </div>
              </div>
              <div className='ArtistPortDiv DBlock'>
                <div className='RecoTitle DFlex h-auto mb-5'>
                  <div className='TitlePort DBlock h-auto'>
                    <p>Description :</p>
                  </div>
                  <div className='Description DBlock h-auto'>
                    <p>{singleArtists.description}</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 mb-3'>
                    <div className='ArtistPortVideo DBlock'>
                      <div className='TitlePort DBlock h-auto'>
                        <p>Check Video</p>
                      </div>
                      <div className='ArtistVideo DBlock'>
                        {video ? (
                          <ReactPlayer width='100%' height='100%' url={video} />
                        ) : (
                          <div className='NoYout DFlex justify-content-center h-100'>
                            <h3>This artist has no video to show</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12 mb-3'>
                    <div className='ArtistPortGallery DBlock'>
                      <div className='TitlePort DBlock h-auto'>
                        <p>Check Gallery</p>
                      </div>
                      <div className='AccordionGallery DBlock'>
                        {gallery.length > 0 ? (
                          <div className='ScrollLeadsDiv DBlock'>
                            <Gallery images={gallery} />
                          </div>
                        ) : (
                          <div className='DFlex justify-content-center h-100'>
                            <h3>This artist has no pictures to show</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ArtistRec DBlock mb-3'>
                <div className='RecommendationOuterDiv DBlock'>
                  <div className='ArtistProfileBtnDiv DFlex justify-content-end'>
                    <Link to={`/artist-profile/${singleArtists.id}`} className='ArtistProfileBtn' style={BG}>
                      VIEW FULL PROFILE
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className='NoReview DFlex justify-content-center'>
                <h4>Click a profile to view more information</h4>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default LeadsProfile;
