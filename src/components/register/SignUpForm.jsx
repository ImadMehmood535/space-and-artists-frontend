import React, { Component, Fragment } from "react";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import ThanksMessage from "./ThanksMessage";


class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showStep = this.props.steps;
    return (
      <Fragment>
        <div className="AccountForm DBlock">
          {showStep !== "Success" ? (
            <div className="Title DBlock h-auto">
              <h2>Find and be found!</h2>
            </div>
          ) : (
            ""
          )}
          <div className="FormTab DBlock">
            {showStep === "StepOne" ? (
              <FormStepOne
                handleFirstSteps={this.props.handleFirstSteps}
                setDate={this.props.setDate}
                handleCountry={this.props.handleCountry}
                handleState={this.props.handleState}
                handlePhone={this.props.handlePhone}
                handleWhatsApp={this.props.handleWhatsApp}
                handleProfileImage={this.props.handleProfileImage}
                form={this.props.form}
              />
            ) : showStep === "StepTwo" ? (
              <FormStepTwo
                handleSubmit={this.props.handleSubmit}
                setDate={this.props.setDate}
                handleSteps={this.props.handleSteps}
                handleProfileImage={this.props.handleProfileImage}
                handleCoverImage={this.props.handleCoverImage}
                handleState={this.props.handleState}
                handlePhone={this.props.handlePhone}
                handleWhatsApp={this.props.handleWhatsApp}
                handleInstagram={this.props.handleInstagram}
                form={this.props.form}
              />
            ) : showStep === "Success" ? (
              <ThanksMessage />
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignUpForm;
