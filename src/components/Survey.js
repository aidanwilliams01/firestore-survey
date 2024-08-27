import React from "react";
import PropTypes from "prop-types";

function Survey(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenSurveyClicked(props.id)}>
        <h3>{props.title}</h3>
        <p>Question 1: <em>{props.question1}</em></p>
        <p>Question 2: <em>{props.question2}</em></p>
        <p>Question 3: <em>{props.question3}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Survey.propTypes = {
  title: PropTypes.string,
  question1: PropTypes.string,
  question2: PropTypes.string,
  question3: PropTypes.string,
  id: PropTypes.string,
};

export default Survey;