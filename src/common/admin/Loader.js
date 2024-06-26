import React, { Fragment } from 'react';

const Loader = ({ position = false, loader }) => {
  return (
    <Fragment>
      {position ? (
        <div class={`cubes ${loader ? 'd-flex' : 'd-none'}`}>
          <div className='InnerCube'>
            <div class='sk-cube sk-cube1'></div>
            <div class='sk-cube sk-cube2'></div>
            <div class='sk-cube sk-cube3'></div>
            <div class='sk-cube sk-cube4'></div>
            <div class='sk-cube sk-cube5'></div>
            <div class='sk-cube sk-cube6'></div>
            <div class='sk-cube sk-cube7'></div>
            <div class='sk-cube sk-cube8'></div>
            <div class='sk-cube sk-cube9'></div>
          </div>
        </div>
      ) : (
        <div className={`loadingSpinnerDiv DFlex ${loader ? 'd-flex' : 'd-none'}`}>
          <div className='loadingSpinner'></div>
        </div>
      )}
    </Fragment>
  );
};

export default Loader;
