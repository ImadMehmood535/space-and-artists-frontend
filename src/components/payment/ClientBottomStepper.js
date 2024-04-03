import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PlanContext from './planContext';
const ClientBottomStepper = () => {
  const planContext = useContext(PlanContext);
  const { setPlan, plan } = planContext;

  const [bgClr, setBgClr] = useState('white');
  const [bgClr2, setBgClr2] = useState('white');
  const [textClr, setTextClr] = useState('var(--main)');
  const [textClr2, setTextClr2] = useState('var(--main)');

  const annualHandler = () => {
    setBgClr2('var(--main)');
    setTextClr2('white');
    setBgClr('white');
    setTextClr('var(--main)');
    setPlan({ plan: 'annual' });
  };

  const monthHandler = () => {
    setBgClr('var(--main)');
    setTextClr('white');
    setBgClr2('white');
    setTextClr2('var(--main)');
    setPlan({ plan: '3 months' });
  };

  let change;
  const path = window.location.pathname;
  if (path === '/client-payment1') {
    change = true;
  }
  useEffect(() => {
    if (path === '/client-payment2') {
      change = false;
      if (plan === 'annual') {
        annualHandler();
      } else {
        monthHandler();
      }
    }
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={3} md={3} xs={5} style={{ textAlign: 'center' }}>
          <div className="BottomStepperHeading">
            <h2 style={{ color: `${bgClr}`, marginBottom: '4px' }}>3 Months</h2>
          </div>
          <Button
            onClick={change && monthHandler}
            variant="outline-light"
            style={{ background: `${bgClr}` }}>
            <div
              className="pt-3 pb-3 ml-3 mr-3"
              style={{ background: `${bgClr}` }}>
              <h4 style={{ color: `${textClr}` }}>
                <b>$10</b>
              </h4>
            </div>
          </Button>
        </Col>

        <Col
          lg={1}
          md={2}
          xs={2}
          style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h2
            style={{
              color: 'var(--main)',
              textAlign: 'center',
            }}>
            <b>Or</b>
          </h2>
        </Col>

        <Col lg={3} md={3} xs={5} style={{ textAlign: 'center' }}>
          <div className="BottomStepperHeading">
            <h2 style={{ color: `${bgClr2}`, marginBottom: '4px' }}>1 Year</h2>
          </div>
          <Button
            onClick={change && annualHandler}
            variant="outline-light"
            style={{ background: `${bgClr2}` }}>
            <div
              className="pt-3 pb-3 ml-3 mr-3"
              style={{
                background: `${bgClr2}`,
              }}>
              <h4 style={{ color: `${textClr2}` }}>
                <b>$15</b>
              </h4>
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientBottomStepper;
