import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewSurveyForm(props){

  function handleNewSurveyFormSubmission(event) {
    event.preventDefault();
    props.onNewSurveyCreation({
      title: event.target.title.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewSurveyFormSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewSurveyForm.propTypes = {
  onNewSurveyCreation: PropTypes.func
}

export default NewSurveyForm