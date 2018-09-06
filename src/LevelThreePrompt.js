import React, { Component } from 'react';
import { getLevelThreeLessonData } from './Data.js';
import { getRandomPrompt, isPresent, animateHeartIcons, createHeartIcons, resetHearts } from './CommonFunctions.js'
import _ from 'lodash';

var usersSentence = [];

class LevelThreePrompt extends Component {
  constructor(props) {
  super(props);
  this.state = {
    $btnWords: [],
    $icnHearts: [],
    isHidden: true,
    isPresent: true,
    numberOfCorrectAnswers: 0,
    numberOfTotalPrompts: 0,
    prompt: null,
    prompts: [],
    usersSentence: []
    };

    this.animateButtons = this.animateButtons.bind(this);
    this.animateHeartIcons = animateHeartIcons.bind(this);
    this.createHeartIcons = createHeartIcons.bind(this);
    this.createWordButtons = this.createWordButtons.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNewPrompt = this.getNewPrompt.bind(this);
    this.getRandomPrompt = getRandomPrompt.bind(this);
    this.isCorrectWord = this.isCorrectWord.bind(this);
    this.isPresent = isPresent.bind(this);
    this.resetHearts= resetHearts.bind(this);
}

animateButtons( isCorrect ) {
  if ( isCorrect ) {
    this.setState({
      $btnWords: _.shuffle( this.createWordButtons( this.state.prompt, this.state.isPresent ) )
    })
  }

  let $buttons = document.querySelectorAll('.button');
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].className = "button is-medium is-warning";
  }
}

componentDidMount( ) {
  usersSentence = [];
  let levelThreePrompts = getLevelThreeLessonData();
  let newPrompt = getRandomPrompt( levelThreePrompts );

  this.setState({
    prompt: newPrompt,
    prompts: levelThreePrompts,
    numberOfTotalPrompts: levelThreePrompts.length,
    $btnWords: _.shuffle( this.createWordButtons( newPrompt, this.state.isPresent ) ),
    $icnHearts: this.createHeartIcons(levelThreePrompts.length)
  })
}

createWordButtons( newPrompt, pastOrPresent ) {
  let that = this;
  let $btnWords = [];
  let presentTenseAnswers = newPrompt.presentTenseSentence.split(" ");
  let pastTenseAnswers = newPrompt.pastTenseSentence.split(" ");
  if ( pastOrPresent ) {
    for ( let i = 0; i < presentTenseAnswers.length; i++) {
      let $btnWord = <button key={ i } onClick={ that.isCorrectWord } className="button is-medium is-warning">{ presentTenseAnswers[i] }</button>;
      $btnWords.push( $btnWord );
    }
  } else {
    for ( let i = 0; i < pastTenseAnswers.length; i++) {
      let $btnWord = <button key={ i } onClick={ that.isCorrectWord } className="button is-medium is-warning">{ pastTenseAnswers[i] }</button>;
      $btnWords.push( $btnWord );
    }
  }

  return _.shuffle( $btnWords );
}

getNewPrompt( unusedPrompts, currentPrompt ) {
  if ( !_.isUndefined( currentPrompt ) && !_.isNil( currentPrompt ) ) {
    for (let i = 0; i < unusedPrompts.length; i++ ) {
      if ( unusedPrompts[i].presentTenseSentence === currentPrompt.presentTenseSentence ) {
        unusedPrompts.splice( i, 1 );
      }
    }
  }
  if ( unusedPrompts.length > 0 ) {
    let newPrompt = this.getRandomPrompt( unusedPrompts )
    this.setState({
      prompts: unusedPrompts,
      prompt: newPrompt,
      $btnWords: this.createWordButtons(newPrompt, this.state.isPresent)
    })

  }
}

handleSubmit() {
    if ( this.state.usersSentence === this.state.prompt.pastTenseSentence && this.state.prompts.length > 0 && !this.state.isPresent || this.state.usersSentence === this.state.prompt.presentTenseSentence && this.state.prompts.length > 0 && this.state.isPresent ) {
      let correctAnswerCount = this.state.numberOfCorrectAnswers;
      this.getNewPrompt( this.state.prompts.slice(), this.state.prompt );
      this.setState({
        numberOfCorrectAnswers: correctAnswerCount +=1,
        usersSentence: ""
      })
      this.animateHeartIcons( this.state.numberOfCorrectAnswers );
    } else {
      this.setState({
        usersSentence: ""
      })
    }
    let $btnWords = document.querySelectorAll(".is-hidden");
    for ( let i = 0; i < $btnWords.length; i++ ) {
      $btnWords[i].className = "button is-medium is-warning";
    }
    usersSentence = [];
}

isCorrectWord( e ) {
  var $button = e.target;
  let usersAnswer = e.target.innerText.trim();
  usersSentence.push(usersAnswer);
  $button.className = "is-hidden";
  this.setState({
    usersSentence: usersSentence.join(" ")
  })
}
//make isPresent into an object with a isPresent.value and isPresent.cssClass
    render() {
      if ( !_.isUndefined( this.state.prompt ) && !_.isNil( this.state.prompt ) ) {
      return (
        <div>
          <div className="inner-tabs align-center">
              <a onClick={ this.isPresent } className={ this.state.isPresent ? "is-selected" : "" }>Present</a>
              <a onClick={ this.isPresent } className={ this.state.isPresent ? "" : "is-selected" }>Past</a>
          </div>
          <div className="title is-4">
            <h4 className="directions"><span className="bold">Directions: </span>Click on the buttons to make a complete sentence.</h4>
          </div>
          <div className="align-center">
            <img className="PromptImage" src={ this.state.prompt.image }></img>
          </div>
          <div className="align-center">{ this.state.$btnWords }</div>
          <div className="WritingPrompt title is-2 align-center">
            <h1>{ this.state.usersSentence }</h1>
          </div>
          <div className="field">
            <button className="button is-medium is-black" onClick={ this.handleSubmit }>Submit</button>
          </div>
          <div className="icnDiv align-center">
            { this.state.$icnHearts }
          </div>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default LevelThreePrompt;
