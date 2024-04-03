import React from 'react';
import Stepper from './Stepper';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

function PaymentScreen2(props) {
  const { updateStep  , submitForm} = props;
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
          <h2 className="text-center mt-4">
            Do you want to showcase yourself to the world?
          </h2>
        </div>
        <Row xs={2} md={4} lg={6} className="mt-5 justify-content-md-center">
          <Col>
            <div
              className="button-default button-slanted pl-4 pr-4 pt-2"
              style={{ background: '#2c2c2c', border: '1px solid white' }}>
              <Link
               onClick={() => updateStep(1)}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}>
                <span class="button-slanted-content">
                  <u>NO</u>
                </span>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="ArtistRec DBlock">
              <div className="RecommendationOuterDiv DBlock">
                <div className="ArtistProfileBtnDiv DFlex justify-content-center">
                  <Link
                    onClick={submitForm}
                    // to="payment-gateway"
                    style={{ textDecoration: 'none', color: 'white' }}
                    className="ArtistProfileBtn ml-2"
                    style={BG}>
                    YES
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentScreen2;
