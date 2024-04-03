import React, { Component, Fragment } from 'react';
import FormStepOne from './FormStepOne';
import FormStepThree from './FormStepThree';
import FormStepTwo from './FormStepTwo';
import ThanksMessage from './ThanksMessage';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showStep = this.props.steps;
    return (
      <Fragment>
        <div className='AccountForm DBlock'>
          <div className='Title DBlock h-auto'>
            <h2>Find and be found!</h2>
          </div>
          <div className='FormTab DBlock'>
            {showStep === 'StepOne' ? (
              <FormStepOne
                handleSteps={this.props.handleSteps}
                setDate={this.props.setDate}
                handleCountry={this.props.handleCountry}
                handleState={this.props.handleState}
                handlePhone={this.props.handlePhone}
                form={this.props.form}
              />
            ) : showStep === 'StepTwo' ? (
              <FormStepTwo
                handleSubmit={this.props.handleSubmit}
                handleProfileImage={this.props.handleProfileImage}
                handleCoverImage={this.props.handleCoverImage}
                handleState={this.props.handleState}
                handleWhatsApp={this.props.handleWhatsApp}
                handleSteps={this.props.handleSteps}
                form={this.props.form}
              />
            ) : showStep === 'Success' ? (
              <ThanksMessage />
            ) : (
              ''
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignUpForm;
