import React, { Fragment } from 'react';

const ComingSoon = () => {
  return (
    <Fragment>
      <div className='ComingSoonSec DBlock'>
        <div className='ComingSoonDiv DFlex justify-content-center flex-column' style={{ backgroundImage: 'url("/assets/svg/BG.svg")' }}>
          <img src='/assets/svg/Lines.svg' className='Before' alt='' />
          <img src='/assets/svg/Lines.svg' className='After' alt='' />
          <img src='/assets/svg/ComingLogo.svg' className='Logo' alt='' />
          <h2>OUR WEBSITE IS</h2>
          <h1>COMING SOON</h1>
          <p>Reach out to us</p>
          <ul className='SocialUl DFlex w-100 justify-content-center'>
            <li>
              <a href='https://www.linkedin.com/company/spacenartists-com/?viewAsMember=true' target='blank'>
                <i className='fab fa-linkedin-in icon'></i>
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/spacenartists/' target='blank'>
                <i className='fab fa-instagram icon'></i>
              </a>
            </li>
            <li>
              <a href='https://twitter.com/SpaceNArtists' target='blank'>
                <i className='fab fa-twitter icon'></i>
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/Spacenartistscom-100435768621944' target='blank'>
                <i className='fab fa-facebook-f icon'></i>
              </a>
            </li>
            <li>
              <a href='https://api.whatsapp.com/send?phone=+971543878755' target='blank'>
                <i className='fab fa-whatsapp icon'></i>
              </a>
            </li>
            <li>
              <a href='mailto:info@spacenartists.com' target='blank'>
                <i className='fas fa-envelope icon'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ComingSoon;
