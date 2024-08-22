import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <label>Title: </label>
        <input
          type='text'
          name='title' />
        <br />
        <label>Question 1: </label>
        <input
          type='text'
          name='question1' />
        <br />
        <label>Question 2: </label>
        <input
          type='text'
          name='question2' />
        <br />
        <label>Question 3: </label>
        <input
          type='text'
          name='question3' />
        <br />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
}

export default ReusableForm;