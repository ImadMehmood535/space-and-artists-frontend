import React, { useContext } from 'react';
import Stepper from './Stepper';
import ClientBottomStepper from './ClientBottomStepper';
import { Link } from 'react-router-dom';

const ClientPayment2 = () => {
  const BG = {
    color: 'white',
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
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
          <ClientBottomStepper />
        </div>

        <div className="ArtistRec DBlock mb-3 mt-5">
          <div className="RecommendationOuterDiv DBlock">
            <div className="ArtistProfileBtnDiv DFlex justify-content-center">
              <Link
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

export default ClientPayment2;
