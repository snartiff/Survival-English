import React, { Component } from 'react';
import { getLevelOneLessonData } from './Data.js';
import _ from 'lodash';

class LevelOnePrompt extends Component {
  constructor(props) {
  super(props);
  this.state = {
    prompts: [],
    prompt: null,
    isPresent: true,
    $wordButtons: []
    };

  this.createWordButtons = this.createWordButtons.bind(this)
  this.isCorrectWord = this.isCorrectWord.bind(this)
  this.getNewPrompt = this.getNewPrompt.bind(this)
  this.getRandomPrompt = this.getRandomPrompt.bind(this)
  this.animateButtons = this.animateButtons.bind(this)
  this.isPresent = this.isPresent.bind(this)
}

componentDidMount() {
    let levelOnePrompts = getLevelOneLessonData();
    let newPrompt = this.getRandomPrompt( levelOnePrompts );

    this.setState({
      prompts: levelOnePrompts,
      prompt: newPrompt,
      $wordButtons: _.shuffle( this.createWordButtons( newPrompt ) )
    })
}

isPresent(e) {
  let levelOnePrompts = getLevelOneLessonData();
  let newPrompt = this.getRandomPrompt( levelOnePrompts );

  //Reset prompts
  this.setState({
    isPresent: e.target.innerText === "Present" ? true : false,
    prompts: levelOnePrompts,
    prompt: newPrompt
  })
}

getRandomPrompt( prompts ) {
  let randomPrompt = prompts[ Math.floor( Math.random() * prompts.length ) ];
  return randomPrompt
}

getNewPrompt() {
  let unusedPrompts = this.state.prompts.slice();
  let currentPrompt = this.state.prompt;
  if ( !_.isUndefined( currentPrompt ) && !_.isNil( currentPrompt ) ) {
    for (let i = 0; i < unusedPrompts.length; i++ ) {
      if ( unusedPrompts[i].sentence === currentPrompt.sentence ) {
        unusedPrompts.splice( i, 1 );
      }
    }
  }

  if ( unusedPrompts.length > 0 ) {
    this.setState({
      prompts: unusedPrompts,
      prompt: this.getRandomPrompt( unusedPrompts )
    })
  }
}

createWordButtons( newPrompt ) {
  let that = this;
  let aryWordButtons = [];
  let aryPromptAnswers = newPrompt.possibleAnswers;

  for ( let i = 0; i < aryPromptAnswers.length; i++) {
    let wordButton = <button key={ i } onClick={ that.isCorrectWord } className="button is-medium is-warning">{ aryPromptAnswers[i] }</button>;
    aryWordButtons.push(wordButton);
  }

  return aryWordButtons;
}

isCorrectWord( e ) {
  let usersAnswer = e.target.innerText.trim();

  if ( usersAnswer === this.state.prompt.pastTenseAnswer && this.state.prompts.length > 0 && !this.state.isPresent || usersAnswer === this.state.prompt.presentTenseAnswer && this.state.prompts.length > 0 && this.state.isPresent ) {
    this.getNewPrompt();
  }

  if ( usersAnswer === this.state.prompt.pastTenseAnswer && !this.state.isPresent || usersAnswer === this.state.prompt.presentTenseAnswer && this.state.isPresent ) {
    e.target.className = "";
    e.target.className = "button is-medium is-success";
    setTimeout( () => this.animateButtons( true ), 1000 );
  }
  else  {
    e.target.className = "";
    e.target.className = "button is-medium is-danger";
    setTimeout( () => this.animateButtons( false ), 1000 );
  }
}

animateButtons( isCorrect ) {
  if ( isCorrect ) {
    this.setState({
      $wordButtons: _.shuffle( this.createWordButtons( this.state.prompt ) )
    })
  }
  //set timeout here
  let $buttons = document.querySelectorAll('.button');
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].className = "button is-medium is-warning";
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
            <h4 className="directions"><span className="bold">Directions: </span>{ this.state.isPresent ? "Click on the correct word in the present tense." : "Click on the correct word in the past tense."  }</h4>
          </div>
          <div className="align-center">
            <img className="PromptImage" src={ this.state.prompt.image }></img>
          </div>
          <div className="align-center">{ this.state.$wordButtons }</div>
          <div className="WritingPrompt title is-2 align-center">
            <h1>{ this.state.prompt.sentence }</h1>
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

export default LevelOnePrompt;
