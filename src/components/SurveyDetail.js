import React from "react";
import PropTypes from "prop-types";

function SurveyDetail(props){
  const { survey, onClickingDelete } = props;

  function handleNewAnswerFormSubmission(event) {
    event.preventDefault();
    props.onNewAnswersCreation({
      response1: event.target.response1.value,
      response2: event.target.response2.value,
      response3: event.target.response3.value,
      surveyid: event.target.surveyid.value,
      // timeOpen: new Date(),
      // formattedWaitTime: formatDistanceToNow(new Date(), {
      //   addSuffix: true
      // })
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleNewAnswerFormSubmission}>
        <h3>{survey.title}</h3>
        <p><em>{survey.question1}</em></p>
        <input type="text" name="response1" />
        <p><em>{survey.question2}</em></p>
        <input  type="text" name="response2" />
        <p><em>{survey.question3}</em></p>
        <input  type="text" name="response3" />
        <br />
        <input type="hidden" name="surveyid" value={survey.id} />
        <button>Submit Answers</button>
      </form>
      <br />
      <button onClick={ props.onClickingEdit }>Update Survey</button>
      <button onClick={()=> onClickingDelete(survey.id) }>Close Survey</button>
      <hr/>
    </React.Fragment>
  );
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onNewAnswersCreation: PropTypes.func
};

export default SurveyDetail;