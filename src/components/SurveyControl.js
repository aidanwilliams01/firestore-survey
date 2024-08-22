import React, { useEffect, useState } from 'react';
import NewSurveyForm from './NewSurveyForm.js';
import SurveyList from './SurveyList';
import SurveyDetail from './SurveyDetail';
import EditSurveyForm from './EditSurveyForm.js';
// import { connect } from 'react-redux';
// import PropTypes from "prop-types";
// import * as a from '../actions/index.js';
// import { formatDistanceToNow } from 'date-fns';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js';

function SurveyControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainSurveyList, setMainSurveyList] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "surveys"),
      (collectionSnapshot) => {
        const surveys = [];
        collectionSnapshot.forEach((doc) => {
          surveys.push({
            title: doc.data().title,
            question1: doc.data().question1,
            question2: doc.data().question2,
            question3: doc.data().question3,
            id: doc.id
          });
        });
        setMainSurveyList(surveys);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // formVisibleOnPage: false,
  //     selectedSurvey: null,
  //     editing: false
  //   };
  // }

  // const componentDidMount = () => {
  //   this.waitTimeUpdateTimer = setInterval(() =>
  //     this.updateSurveyElapsedWaitTime(),
  //   60000
  //   );
  // }

  // const componentWillUnmount = () => {
  //   console.log("component unmounted!");
  //   clearInterval(this.waitTimeUpdateTimer);
  // }

  // const updateSurveyElapsedWaitTime = () => {
  //   const { dispatch } = this.props;
  //   Object.values(this.props.mainSurveyList).forEach(survey => {
  //     const newFormattedWaitTime = formatDistanceToNow(survey.timeOpen, {
  //       addSuffix: true
  //     });
  //     const action = a.updateTime(survey.id, newFormattedWaitTime);
  //     dispatch(action);
  //   });
  // }

  const handleClick = () => {
    if (selectedSurvey != null) {
      setFormVisibleOnPage(false);
      setSelectedSurvey(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewSurveyToList = async (newSurveyData) => {
    await addDoc(collection(db, "surveys"), newSurveyData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedSurvey = (id) => {
    const selection = mainSurveyList.filter(survey => survey.id === id)[0];
    setSelectedSurvey(selection);
  }

  const handleDeletingSurvey = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSelectedSurvey(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingSurveyInList = async (surveyToEdit) => {
    const surveyRef = doc(db, "surveys", surveyToEdit.id);
    await updateDoc(surveyRef, surveyToEdit);
    setEditing(false);
    setSelectedSurvey(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  // if (auth.currentUser == null) {
    // return (
    //   <React.Fragment>
    //     <h1>You must be signed in to access the queue.</h1>
    //   </React.Fragment>
    // )
  // } else if (auth.currentUser != null) {
      if(error) {
        currentlyVisibleState = <p>There was an error: {error}</p>
      } else if (editing) {
        currentlyVisibleState =
          <EditSurveyForm
            survey = {selectedSurvey}
            onEditSurvey = {handleEditingSurveyInList} />
          buttonText = "Return to Survey List";
      } else if (selectedSurvey != null) {
        currentlyVisibleState =
          <SurveyDetail
            survey={selectedSurvey}
            onClickingDelete={handleDeletingSurvey}
            onClickingEdit = {handleEditClick} />
          buttonText = "return to Survey List";
      } else if (formVisibleOnPage) {
        currentlyVisibleState = 
          <NewSurveyForm 
            onNewSurveyCreation={handleAddingNewSurveyToList} />
        buttonText = "Return to Survey List";
      } else {
        currentlyVisibleState = 
          <SurveyList 
          onSurveySelection={handleChangingSelectedSurvey}
          surveyList={mainSurveyList} />
        buttonText = "Add Survey";  
      }

      return (
        <React.Fragment>
          {currentlyVisibleState}
          {error ? null : <button onClick={handleClick}>{buttonText}</button>}
        </React.Fragment>
      );
    }


export default SurveyControl;