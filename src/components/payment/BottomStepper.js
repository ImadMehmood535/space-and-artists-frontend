import React, { useState, useContext, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PlanContext from './planContext';

function BottomStepper(props){

  const {handleChange } = props;
  const planContext = useContext(PlanContext);
  const { setClientArtistPlan, clientArtistPlan } = planContext;

  const [plan, setPlan] = useState('');
  
  const [bgClr, setBgClr] = useState('white');
  const [bgClr2, setBgClr2] = useState('white');
  const [bgClr3, setBgClr3] = useState('white');
  const [textClr, setTextClr] = useState('var(--main)');
  const [textClr2, setTextClr2] = useState('var(--main)');
  const [textClr3, setTextClr3] = useState('var(--main)');

  //annual plan
  const annualHandler = () => {
    setBgClr3('var(--main)');
    setTextClr3('white');
    setBgClr2('white');
    setTextClr2('var(--main)');
    setBgClr('white');
    setTextClr('var(--main)');
    setClientArtistPlan({ clientArtistPlan: 'annual' });
  };

  //quarter plan
  const quarterHandler = () => {
    setBgClr2('var(--main)');
    setTextClr2('white');
    setBgClr3('white');
    setTextClr3('var(--main)');
    setBgClr('white');
    setTextClr('var(--main)');
    setClientArtistPlan({ clientArtistPlan: 'quarter' });
  };

  //monthly plan
  const monthHandler = () => {
    setBgClr('var(--main)');
    setTextClr('white');
    setBgClr2('white');
    setTextClr2('var(--main)');
    setBgClr3('white');
    setTextClr3('var(--main)');
    setClientArtistPlan({ clientArtistPlan: '3 months' });
  };

  let change;
  // path
  const path = window.location.pathname;
  if (path === '/payment1') {
    change = true;
  }
  useEffect(() => {
    if (path === '/payment2') {
      change = false;
      if (clientArtistPlan === 'annual') {
        annualHandler();
      } else if (clientArtistPlan === 'quarter') {
        quarterHandler();
      } else {
        monthHandler();
      }
    }
  }, []);

  return (
    <Container className="BottomContainer">
      <Row className="justify-content-center ClientArtistBottomStepperHeading align-items-center">
        {/* <Col
          lg={2}
          md={2}
          sm={2}
          style={{ textAlign: 'center', marginRight: '1rem' }}>
          <h2 style={{ color: bgClr }}>Monthly</h2>
          <Button
            onClick={change && monthHandler}
            className="pt-2 pb-2 PriceContainer"
            style={{ background: bgClr }}>
            <div onClick={() => handleChange(1,'100')}>
              <span style={{ color: 'black' }}>Per </span>
              <br />
              <span style={{ color: 'black' }}>Month </span>
              <h4 style={{ color: textClr }}>
                <b>$100</b>
              </h4>
            </div>
          </Button>
        </Col> */}
        {/* <Col
          style={{
            color: 'var(--main)',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          lg={2}
          md={2}
          sm={2}>
          <b
            style={{
              fontSize: '30px',
            }}>
            -----
          </b>
        </Col> */}
        <Col
          lg={2}
          md={2}
          sm={2}
          style={{ color: 'white', textAlign: 'center', marginRight: '1rem' }}>
          <h2 style={{ color: bgClr2 }}>Quarterly</h2>

          <Button
            onClick={change && quarterHandler}
            className="pt-2 pb-2 PriceContainer"
            style={{ background: bgClr2 , width: '100%' }}>
            <div style={{ margin: '10px'}} onClick={() => handleChange(3,'18')}>
              <h4 style={{ color: textClr2 }}>
                <b>$ 18</b>
              </h4>
              <span style={{ color: 'black' }}>(3 Month)</span>
              {/* <br /> */}
              {/* <span style={{ color: 'black' }}>Month </span> */}
            </div>
          </Button>
        </Col>
        <Col
          style={{
            color: 'var(--main)',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          lg={2}
          md={2}
          sm={2}>
          <b
            style={{
              fontSize: '30px',
            }}>
            -----
          </b>
        </Col>
        <Col
          lg={2}
          md={2}
          sm={2}
          style={{ color: 'white', textAlign: 'center' }}>
          <h2 style={{ color: bgClr3 }}>Annually</h2>

          <Button
            onClick={change && annualHandler}
            className="pt-2 pb-2 PriceContainer"
            style={{ background: bgClr3  , width: '100%'}}>
            <div style={{ margin: '10px'}} onClick={() => handleChange(12,'60')}>
              <h4 style={{ color: textClr3 }}>
                <b>$ 60</b>
              </h4>
              <span style={{ color: 'black' }}>(12 Month)</span>
              {/* <br />
              <span style={{ color: 'black' }}>Month </span> */}
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BottomStepper;
