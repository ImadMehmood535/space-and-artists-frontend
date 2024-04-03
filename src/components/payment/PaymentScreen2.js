import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import BottomStepper from './BottomStepper';
import { Link } from 'react-router-dom';

function PaymentScreen2(props){
  const { updateStep } = props;

  const BG = {
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
    color: 'white',
  };
  return (
    <div className="Paymentsection DBlock">
      <div className="DBlock">
        <Stepper />
      </div>
      <div className="container">
        <div className="StepperTitle DBlock PaymentTitle">
          <h2 className="text-center mt-4">You're almost there!</h2>
        </div>
        <div>
          <BottomStepper />
        </div>
        <div className="ArtistRec DBlock mb-3 mt-5">
          <div className="RecommendationOuterDiv DBlock">
            <div className="ArtistProfileBtnDiv DFlex justify-content-center">
              <Link
               onClick={() => updateStep(3)}
                style={{ textDecoration: 'none', color: 'white' }}
                className="ArtistProfileBtn ml-2"
                style={BG}>
                COMPLETE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen2;
