import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Stepper from './Stepper';
import BottomStepper from './BottomStepper';
import { Link } from 'react-router-dom';
import Loader from "../../common/Loader";
import { baseUrl, headers, notificationError, notificationSuccess, validateValue } from '../../common/constants';


// 
import PaymentStepper1 from './PaymentStepper1';
import PaymentScreen2 from './PaymentScreen2';
import PaymentScreen3 from './PaymentScreen3';
import PaymentForm from './PaymentForm';

function Payments() {
  const [currentStep, setCurrentStep] = useState(1);
  const history = useHistory();

  const [planPrice, setPlan] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (duration, plan) => {
    console.log('getting', duration, plan);
    // console.log(e);
    setPlan(plan);
    setPlanDuration(duration);

  };

  const submitForm = async (e) => {
    e.preventDefault();
    const getUserInfo = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(getUserInfo);

    console.log('userinfo', userInfo);

    // Starting Date.
    var date = new Date();
    var startingDate = date.toLocaleDateString();
    // forward Date
    var endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planDuration);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };


    if (userInfo !== null) {
      const payLoad = {
        email: userInfo['email'],
        phone: userInfo['phone'],
        whatsapp: userInfo['whatsapp'],
        firstname: userInfo['firstname'],
        lastname: userInfo['lastname'],
        subscriptionDate: startingDate,
        endDate: endDate.toLocaleDateString(),
        planDuration: planDuration,
        planPrice: planPrice,
        statusSubscribe : 'Active'
      }

      const telr = 'payments/';
      try {
        const res = await axios.post(telr, payLoad);
        if (res?.data['order']['url']) {
          localStorage.removeItem('userInfo');
          window.location.assign(res?.data['order']['url']);
        }
      } catch (error) {
        console.log(error);
      }
    } else {

      const userInformation = localStorage.getItem('userInformation');
      const user = JSON.parse(userInformation);
      console.log(user);

      const payLoad = {
        email: user['email'],
        phone: user['phone'],
        whatsapp: user['whatsapp'],
        firstname: user['firstname'],
        lastname: user['lastname'],
        subscriptionDate: startingDate,
        endDate: endDate.toLocaleDateString(),
        planDuration: planDuration,
        planPrice: planPrice,
        statusSubscribe : 'Active'
      }

      const telr = 'payments/';
      try {
        const res = await axios.post(telr, payLoad, config);
        if (res?.data['order']['url']) {
          localStorage.removeItem('userInfo');
          window.location.assign(res?.data['order']['url']);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PaymentStepper1
            updateStep={setCurrentStep}
            handleChange={handleChange}
          />
        );
      // case 2:
      //   return <PaymentScreen2 updateStep={setCurrentStep} />;
      case 2:
        return <PaymentScreen3 submitForm={submitForm} updateStep={setCurrentStep} />;
      case 3:
        return <PaymentForm submitForm={submitForm} updateStep={setCurrentStep} />;
      default:
        return null;
    }
  };
  return (
    <>
      {getForm()}
      {/* <div className="">
            {loading ? (
              <Loader loader={loading} />
            ) : (
              getForm()
            )} */}
      {/* </div> */}
    </>
  )
}

export default Payments;