import React, { Fragment, useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Fragment>
      <div className='PolicyTextSec DBlock'>
        <div className='container'>
          <div className='PolicyArea DBlock'>
            <div className='Title DBlock h-auto'>
              <h2>Contact Us</h2>
            </div>
            <div className='Description DBlock'>
              <div className='TextDiv DBlock h-auto'>
                <h4>SPACENARTISTS FZ-LLC</h4>
                <p>Address: FDBC0965,&nbsp;&nbsp;Service Block,&nbsp;&nbsp;Al Jazirah Al Hamra</p>
                <p>RAKEZ Business Zone-FZ</p>
                <p>Ras Al Khaimah, United Arab Emirates, UAE</p>
                <p>P.O Box No.: 85641</p>
                <p>Call: +971 54 387 8755</p>
                <p>Email: support@spacenartists.com</p>
              </div>
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
