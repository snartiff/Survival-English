import React, { Component } from 'react';
import { getLevelOneLessonData } from './Data.js';
import { getRandomPrompt, getNewPrompt, isPresent } from './CommonFunctions.js'
import _ from 'lodash';

class LevelOnePrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPresent: true,
      numberOfCorrectAnswers: 0,
      prompt: null,
      prompts: [],
      $wordButtons: []
    };
    this.animateButtons = this.animateButtons.bind(this);
    this.createWordButtons = this.createWordButtons.bind(this);
    this.getNewPrompt = getNewPrompt.bind(this);
    this.isCorrectWord = this.isCorrectWord.bind(this);
    this.isPresent = isPresent.bind(this);
  }

  animateButtons( isCorrect ) {
    if ( isCorrect ) {
      this.setState({
        $wordButtons: _.shuffle( this.createWordButtons( this.state.prompt ) )
      })
    }

    let $buttons = document.querySelectorAll('.button');
    for (let i = 0; i < $buttons.length; i++) {
      $buttons[i].className = "button is-medium is-warning";
    }
  }

  componentDidMount() {
      let levelOnePrompts = getLevelOneLessonData();
      let newPrompt = getRandomPrompt( levelOnePrompts );

      this.setState({
        prompts: levelOnePrompts,
        prompt: newPrompt,
        $wordButtons: _.shuffle( this.createWordButtons( newPrompt ) )
      })
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
      this.getNewPrompt( this.state.prompts.slice(), this.state.prompt );
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
