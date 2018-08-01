import React, { Component } from 'react';
import { getLevelTwoLessonData } from './Data.js';
import { getRandomPrompt, getNewPrompt, isPresent } from './CommonFunctions.js'
import _ from 'lodash';

class LevelTwoPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPresent: true,
      numberOfCorrectAnswers: 0,
      numberOfTotalPrompts: 0,
      prompt: null,
      prompts: [],
      userFeedback: ""
    };
    this.getNewPrompt = getNewPrompt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increaseCorrectAnswerCount = this.increaseCorrectAnswerCount.bind(this);
    this.isCorrectSentence = this.isCorrectSentence.bind(this);
    this.isPresent = isPresent.bind(this);
  }

  componentDidMount( ) {
    let levelTwoPrompts = getLevelTwoLessonData();
    let newPrompt = getRandomPrompt( levelTwoPrompts );

    this.setState({
      prompts: levelTwoPrompts,
      prompt: newPrompt,
      numberOfTotalPrompts: levelTwoPrompts.length
    })
  }

  handleSubmit() {
    let usersSentence = document.querySelector(".userInput").value.toLowerCase().trim();
    let numOfCorrectAnswers = this.state.numberOfCorrectAnswers;

    if ( this.isCorrectSentence( usersSentence ) && this.state.prompts.length === 1 ) {
      this.setState({
        userFeedback: "Lesson Complete!",
        numberOfCorrectAnswers: ( numOfCorrectAnswers < this.state.numberOfTotalPrompts ) ? numOfCorrectAnswers += 1 : this.state.numberOfCorrectAnswers
      })
    } else if ( this.isCorrectSentence( usersSentence ) ) {
      document.querySelector(".userInput").value = "";
      this.increaseCorrectAnswerCount();
      this.getNewPrompt( this.state.prompts.slice(), this.state.prompt );
      this.setState({
        userFeedback: ""
      })
    } else {
      this.setState({
        userFeedback: "Try Again!"
      })
    }
  }

  //Usage: When a user submits a correct answer, increaseCorrectAnswerCount increases the numberOfCorrectAnswers
  //setState: numberOfCorrectAnswers increased by 1
  increaseCorrectAnswerCount() {
    let numOfCorrectAnswers = this.state.numberOfCorrectAnswers;
    let correctAnswerCount = numOfCorrectAnswers += 1;
    this.setState({
      numberOfCorrectAnswers: correctAnswerCount
    })
  }

  //Needs documentation
  isCorrectSentence( usersSentence ) {
    if ( usersSentence === this.state.prompt.presentTenseAnswer && this.state.prompts.length > 0 && !this.state.isPresent || usersSentence === this.state.prompt.pastTenseAnswer && this.state.prompts.length > 0 && this.state.isPresent ) {
      this.getNewPrompt( this.state.prompts.slice(), this.state.prompt );
    }

    if ( usersSentence === this.state.prompt.presentTenseAnswer && this.state.isPresent || usersSentence === this.state.prompt.pastTenseAnswer && !this.state.isPresent ) {
      return true
    } else {
      return false
    }
  }

  render() {
    if ( !_.isUndefined( this.state.prompt ) && !_.isNil( this.state.prompt ) ) {
      return (
        <div>
        <div className="inner-tabs align-center">
            <a onClick={ this.isPresent } className={ this.state.isPresent ? "is-selected" : "" }>Present</a>
            <a onClick={ this.isPresent } className={ this.state.isPresent ? "" : "is-selected" }>Past</a>
        </div>
        <div className="title is-4">
          <h4 className="directions"><span className="bold">Directions: </span>{ this.state.isPresent ? "Write the present tense word." : "Write the past tense word."  }</h4>
        </div>
          <div className="align-center"><img className="PromptImage" src={ this.state.prompt.image }></img></div>
          <div className="WritingPrompt title is-2 align-center">{ this.state.prompt.sentence }</div>
        <div className="field">
          <div className="control" >
            <input className="userInput input is-medium is-info"></input>
            <button className="button is-medium is-warning" onClick={ this.handleSubmit }>Submit</button>
            <div className="title is-1 is-green align-center">{ this.state.prompt.feedback }</div>
          </div>
        </div>
        <div className="align-center">
          <h1 className={ this.state.userFeedback === "Try Again!" ? "title is-1 is-red" : "title is-1 is-green" }>{ this.state.userFeedback }</h1>
          <h1 className={ this.state.numberOfCorrectAnswers !== 0 ? "title is-1 is-green" : "title is-1" }>Correct: { this.state.numberOfCorrectAnswers + "/" + this.state.numberOfTotalPrompts }</h1>
        </div>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default LevelTwoPrompt;
