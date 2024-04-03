import React, { Fragment } from 'react';

const ThanksMessage = () => {
  return (
    <Fragment>
      <div className='NotFound DFlex justify-content-center'>
        <div>
        <h2 style={{color:'#fff'}}>Thank you for signing up with SNA. Your account has been created.</h2>
        <h5 style={{textAlign:'center', color:'#fff'}}>Login with your account to proceed.</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default ThanksMessage;
