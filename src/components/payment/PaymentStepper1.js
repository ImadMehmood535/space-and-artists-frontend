import React from 'react';
import Stepper from './Stepper';
import BottomStepper from './BottomStepper';
import { Link } from 'react-router-dom';

function PaymentStepper1(props) {
  const { updateStep  , handleChange} = props;
  const BG = {
    color: 'white',
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
  };
  return (
    <div className="Paymentsection DBlock">
      <div className="DBlock">
        <Stepper />
      </div>
      <div>
        <div className="StepperTitle DBlock PaymentTitle">
          <h2 className="text-center mt-4">Want to be an artist?</h2>
          <h3  style={{color:'#e8b239'}} className="text-center mt-4">Subscription Charges</h3>
        </div>

        <BottomStepper handleChange={handleChange} />

        <div className="ArtistRec DBlock mb-3 mt-5">
          <div className="RecommendationOuterDiv DBlock">
            <div className="ArtistProfileBtnDiv DFlex justify-content-center">
              <Link
                onClick={() => updateStep(2)}
                // to="/payment2"
                style={{ textDecoration: 'none', color: 'white' }}
                className="ArtistProfileBtn ml-2"
                style={BG}>
                PROCEED
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStepper1;
