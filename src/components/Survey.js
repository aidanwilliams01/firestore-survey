import React from "react";
import PropTypes from "prop-types";

function Survey(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenSurveyClicked(props.id)}>
        <h3>{props.title}</h3>
        <p><em>{props.question1}</em></p>
        <p><em>{props.question2}</em></p>
        <p><em>{props.question3}</em></p>
        {/* <p><em>{props.formattedWaitTime}</em></p> */}
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
  // whenSurveyClicked: PropTypes.func,
  // formattedWaitTime: PropTypes.string
};

export default Survey;