import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditSurveyForm (props) {
  const { survey } = props;

  function handleEditSurveyFormSubmission(event) {
    event.preventDefault();
    props.onEditSurvey({
      title: event.target.title.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      id: survey.id,
      // timeOpen: survey.timeOpen,
      // formattedWaitTime: survey.formattedWaitTime
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditSurveyFormSubmission}
        buttonText="Update Survey" />
    </React.Fragment>
  );
}

EditSurveyForm.propTypes = {
  survey: PropTypes.object,
  onEditSurvey: PropTypes.func
}

export default EditSurveyForm;