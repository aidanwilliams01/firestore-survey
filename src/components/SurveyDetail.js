import React from "react";
import PropTypes from "prop-types";

function SurveyDetail(props){
  const { survey, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Survey Detail</h1>
      <h3>{survey.title}</h3>
      <p><em>{survey.question1}</em></p>
      <p><em>{survey.question2}</em></p>
      <p><em>{survey.question3}</em></p>
      <button onClick={ props.onClickingEdit }>Update Survey</button>
      <button onClick={()=> onClickingDelete(survey.id) }>Close Survey</button>
      <hr/>
    </React.Fragment>
  );
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default SurveyDetail;