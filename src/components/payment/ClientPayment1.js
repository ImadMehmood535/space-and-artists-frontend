import React, { useEffect, useContext } from 'react';
import Stepper from './Stepper';
import ClientBottomStepper from './ClientBottomStepper';
import { Link } from 'react-router-dom';

const ClientPayment1 = () => {
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
          <h2 className="text-center mt-4">Want to be an artist?</h2>
        </div>
        <div>
          <ClientBottomStepper color="yellow" />
        </div>

        <div className="ArtistRec DBlock mb-3 mt-5">
          <div className="RecommendationOuterDiv DBlock">
            <div className="ArtistProfileBtnDiv DFlex justify-content-center">
              <Link
                to="/client-payment2"
                style={{ textDecoration: 'none', color: 'white' }}
                className="ArtistProfileBtn ml-2"
                style={BG}>
                START CREATING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPayment1;
