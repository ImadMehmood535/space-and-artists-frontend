import React, { Fragment } from 'react';

const FormStepThree = ({ isBoth }) => {
  const BG = {
    backgroundImage: 'url("/assets/images/PaymentBtn.png")',
  };
  return (
    <Fragment>
      {isBoth ? (
        <form action='' className='form'>
          <ul className='PaymentUl DFlex justify-content-center'>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Monthly</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$100</span>
                </span>
              </a>
            </li>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Quarterly</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$150</span>
                </span>
              </a>
            </li>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Annually</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$200</span>
                </span>
              </a>
            </li>
          </ul>
          <ol className='PaymentDescOl DFlex justify-content-center flex-column'>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
          </ol>
          <div className='PaymentBtnDiv DBlock text-center'>
            <button type='button' className='PaymentBtn' style={BG}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </form>
      ) : (
        <form action='' className='form'>
          <ul className='PaymentUl DFlex justify-content-center'>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Monthly</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$100</span>
                </span>
              </a>
            </li>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Quarterly</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$150</span>
                </span>
              </a>
            </li>
            <li>
              <a href='' className='PaymentLink DBlock'>
                <p>Annually</p>
                <span className='AmountDiv DBlock'>
                  <small>Per</small>
                  <span>$200</span>
                </span>
              </a>
            </li>
          </ul>
          <ol className='PaymentDescOl DFlex justify-content-center flex-column'>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
          </ol>
          <div className='PaymentBtnDiv DBlock text-center'>
            <button type='button' className='PaymentBtn' style={BG}>
              SKIP AND FINISH
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default FormStepThree;
