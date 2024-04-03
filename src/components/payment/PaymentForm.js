import React, { Fragment, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import '../../assets/css/payment.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import CreditCardIcon from '@material-ui/icons/CreditCard';

function PaymentForm(props) {
  const { submitForm } = props;
  const BG = {
    color: 'white',
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var currentYear = new Date().getFullYear(),
    years = [];
  const end = new Date(new Date().setFullYear(new Date().getFullYear() + 10));
  const endYear = end.getFullYear();
  while (currentYear <= endYear) {
    years.push(currentYear++);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    console.log(name);
    console.log(email);
    console.log(phoneNumber);
    console.log(country);
  };
  return (
    <Fragment>
      <div className="Paymentsection DBlock">
        <div className="container">
          <div className="PaymentArea DBlock">
            <div className="Title DBlock PaymentTitle">
              <h2>PAYMENT</h2>
            </div>
            <div>
              <div className="TextDiv">
                <Container>
                  <Row>
                    <Col style={{ borderRight: '1px solid #e8b239' }} lg={5}>
                      <h4 className="mb-3" style={{ color: 'white' }}>
                        Your Plan
                      </h4>
                      <h4 className="mb-3" style={{ color: 'var(--main)' }}>
                        <b>Annually</b>
                      </h4>
                      <p className="mb-3" style={{ color: 'white' }}>
                        {' '}
                        $ 200 / Month
                      </p>
                      <p
                        style={{
                          color: 'white',
                          borderBottom: '1px solid #e8b239',
                          paddingBottom: '20px',
                        }}>
                        <span
                          style={{
                            color: 'var(--main)',
                          }}>
                          Total :{' '}
                        </span>
                        $1500
                      </p>
                      <h4 style={{ color: 'white', marginTop: '20px' }}>
                        Credit Card Info
                      </h4>
                      <Row lg={6} className="mt-2 mb-3">
                        <Col>
                          <Link>
                            <CreditCardIcon
                              fontSize="large"
                              style={{
                                background: 'var(--main)',
                                color: 'white',
                              }}
                            />
                          </Link>
                        </Col>
                        <Col>
                          <Link>
                            <CreditCardIcon
                              fontSize="large"
                              style={{
                                background: 'var(--main)',
                                color: 'white',
                              }}
                            />
                          </Link>
                        </Col>
                      </Row>
                      <Form style={{ marginTop: '0.5rem' }}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            className="formInput"
                            placeholder="Cardholder's Name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Control
                            className="formInput"
                            placeholder="Card Number"
                          />
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                as="select"
                                className="formInput"
                                placeholder="Exp. Month">
                                {months.map((month) => (
                                  <option>{month}</option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                as="select"
                                className="formInput"
                                placeholder="Exp. Month">
                                {years.map((year) => (
                                  <option>{year}</option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Control
                            className="formInput"
                            placeholder="CVC Number"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col lg={7}>
                      <h4 className="mb-3" style={{ color: 'white' }}>
                        Billing Info
                      </h4>
                      <Form style={{ marginTop: '0.5rem' }}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            className="formInput"
                            required
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            className="formInput"
                            required
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                className="formInput"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <CountrySelect
                                className="formInput"
                                value={country}
                                onChange={setCountry}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                      <div className="mt-3" style={{ color: 'white' }}>
                        <p className="mb-1" style={{ color: 'var(--main)' }}>
                          <b>John Doe Osas Lorem</b>
                        </p>
                        <p className="mb-1">Johndoe@example.com</p>
                        <p className="mb-1">+92 011 225 0000</p>
                        <p className="mb-1">3rd Street Business Dubai</p>
                        <p className="mb-1">United Arab Emirates</p>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <div>
                  <Row
                    xs={2}
                    md={4}
                    lg={6}
                    className="mt-5 justify-content-md-end">
                    <Col>
                      <Link
                        style={{
                          marginTop: '5px',
                          textDecoration: 'none',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        BACK TO PLANS
                      </Link>
                    </Col>
                    <Col>
                      <div className="ArtistRec DBlock">
                        <div className="RecommendationOuterDiv DBlock">
                          <div className="ArtistProfileBtnDiv DFlex justify-content-center">
                            <Link
                              onClick={submitForm}
                              style={{ textDecoration: 'none', color: 'white' }}
                              className="ArtistProfileBtn ml-2"
                              // style={BG}
                              >
                              CHECKOUT
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentForm;
