import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const Stepper = () => {
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ color: 'black' }}>
        <Col lg="1" sm="2" xs="2" className="Step">
          <b>1</b>
        </Col>

        <Col
          lg="1"
          sm="2"
          xs="2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DoubleArrowIcon
            alignItems="center"
            className="mr-2 ml-2"
            style={{
              color: 'white',
              fontSize: '55px',
              fontWeight: 'light',
            }}
          />
        </Col>

        <Col lg="1" sm="2" xs="2" className="Step">
          <b>2</b>
        </Col>

        <Col
          lg="1"
          sm="2"
          xs="2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <DoubleArrowIcon
            className="mr-2 ml-2"
            style={{
              color: 'white',
              fontSize: '55px',
            }}
          />
        </Col>

        <Col lg="1" sm="2" xs="2" className="Step" style={{ color: 'white' }}>
          <b>3</b>
        </Col>
      </Row>
    </Container>
  );
};

export default Stepper;
