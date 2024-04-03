import React, { Fragment } from 'react';

const DeclinePaymentMessage = () => {
  return (
    <Fragment>
      <div className='NotFound DFlex justify-content-center'>
        <div>
        <h2 style={{color:'#fff'}}>Oops! Something went wrong!!</h2>
        <h5 style={{textAlign:'center', color:'#fff'}}>Please Request again for your subscriptions</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default DeclinePaymentMessage;
