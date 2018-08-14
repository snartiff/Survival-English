import React, { Component } from 'react';
import { getLevelTwoLessonData } from './Data.js';
import { getRandomPrompt, getNewPrompt, isPresent, animateHeartIcons, createHeartIcons, resetHearts } from './CommonFunctions.js'
import _ from 'lodash';

class LevelTwoPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $icnHearts: [],
      isPresent: true,
      numberOfCorrectAnswers: 0,
      numberOfTotalPrompts: 0,
      prompt: null,
      prompts: [],
      userFeedback: ""
    };
    this.animateHeartIcons = animateHeartIcons.bind(this);
    this.createHeartIcons = createHeartIcons.bind(this);
    this.getNewPrompt = getNewPrompt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increaseCorrectAnswerCount = this.increaseCorrectAnswerCount.bind(this);
    this.isCorrectSentence = this.isCorrectSentence.bind(this);
    this.isPresent = isPresent.bind(this);
    this.resetHearts = resetHearts.bind(this);
  }

  componentDidMount( ) {
    let levelTwoPrompts = getLevelTwoLessonData();
    let newPrompt = getRandomPrompt( levelTwoPrompts );

    this.setState({
      prompts: levelTwoPrompts,
      prompt: newPrompt,
      numberOfTotalPrompts: levelTwoPrompts.length,
      $icnHearts: this.createHeartIcons(levelTwoPrompts.length)
    })
  }

  createHeartIcons( numberOfTotalPrompts ) {
    let $icnHearts = [];
    for ( let i = 0; i < numberOfTotalPrompts; i++ ) {
      let $icnHeart = <i className="fa fa-heart fa-lg is-white" key={ i }></i>;
      $icnHearts.push( $icnHeart );
    }
    return $icnHearts
  }

  handleSubmit() {
    let usersSentence = document.querySelector(".userInput").value.toLowerCase().trim();
    let numOfCorrectAnswers = this.state.numberOfCorrectAnswers;

    if ( this.isCorrectSentence( usersSentence ) && this.state.prompts.length === 1 ) {
      this.setState({
        userFeedback: "Lesson Complete!"
      })
      this.increaseCorrectAnswerCount();
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
    let correctAnswerCount = this.state.numberOfCorrectAnswers;
    this.setState({
      numberOfCorrectAnswers: correctAnswerCount += 1
    })
    this.animateHeartIcons( this.state.numberOfCorrectAnswers );
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
        <div className="icnDiv align-center">
          { this.state.$icnHearts }
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
