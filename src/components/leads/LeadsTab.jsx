import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

const LeadsTab = ({ artists, handleTab, id }) => {
  const BG = {
    backgroundImage: 'url("/assets/images/ProfileImgBgYellow.png")',
  };
  return (
    <Fragment>
      <div className='col-lg-4'>
        <ul className='LeadsTabUl DBlock d-block d-lg-none'>
          {artists &&
            artists.map((list, i) => (
              <li key={i}>
                <Link to={`/artist-profile/${list.id}`} className={`LeadsTabDiv ${list.id == id ? 'active' : ''}`}>
                  <div className='Title DBlock'>
                    <h6>{list.categoryName}</h6>
                  </div>
                  <div className='Body DFlex'>
                    <div className='BodyText DBlock'>
                      <h4>{list.firstName + ' ' + list.lastName}</h4>
                      <hr />
                      <p>
                        {list.cityName}, {list.countryName}
                      </p>
                    </div>
                    <div className='BodyImg DFlex justify-content-center'>
                      <div className='DBlock' style={BG}>
                        <img style={{borderRadius : '5px'}} src={list.profilePicture} alt='' />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        <ul className='LeadsTabUl DBlock d-none d-lg-block'>
          {artists &&
            artists.map((list, i) => (
              <li key={i}>
                <Link to='#!' onClick={(e) => handleTab(e, list.id)} className={`LeadsTabDiv ${list.id == id ? 'active' : ''}`}>
                  <div className='Title DBlock'>
                    <h6>
                      <ShowMoreText lines={1} width={150} more='' less='' className='content-css' anchorClass='my-anchor-css-class' expanded={false}>
                        {list.categoryName}
                      </ShowMoreText>
                    </h6>
                  </div>
                  <div className='Body DFlex'>
                    <div className='BodyText DBlock'>
                      <h4>{list.firstName + ' ' + list.lastName}</h4>
                      <hr />
                      <p>
                        {list.cityName}, {list.countryName}
                      </p>
                    </div>
                    <div className='BodyImg DFlex justify-content-center'>
                      <div className='' style={BG}>
                        <img style={{borderRadius : '8px'}} src={list.profilePicture} alt='' />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default LeadsTab;
