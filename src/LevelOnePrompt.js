import React, { Component } from 'react';
import { getLevelOneLessonData } from './Data.js';
import { getRandomPrompt, getNewPrompt, isPresent, animateHeartIcons, createHeartIcons, resetHearts } from './CommonFunctions.js'
import _ from 'lodash';

class LevelOnePrompt extends Component {
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
      prompts: []
    };

    this.animateButtons = this.animateButtons.bind(this);
    this.animateHeartIcons = animateHeartIcons.bind(this);
    this.createHeartIcons = createHeartIcons.bind(this);
    this.createWordButtons = this.createWordButtons.bind(this);
    this.getHelpTable = this.getHelpTable.bind(this);
    this.getNewPrompt = getNewPrompt.bind(this);
    this.isCorrectWord = this.isCorrectWord.bind(this);
    this.isPresent = isPresent.bind(this);
    this.resetHearts= resetHearts.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
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

  componentDidMount() {
      let levelOnePrompts = getLevelOneLessonData();
      let newPrompt = getRandomPrompt( levelOnePrompts );

      this.setState({
        prompt: newPrompt,
        prompts: levelOnePrompts,
        numberOfTotalPrompts: levelOnePrompts.length,
        $btnWords: _.shuffle( this.createWordButtons( newPrompt, this.state.isPresent ) ),
        $icnHearts: this.createHeartIcons(levelOnePrompts.length)
      })
  }
  createWordButtons( newPrompt, pastOrPresent ) {
    let that = this;
    let $btnWords = [];
    let presentTenseAnswers = newPrompt.presentTenseAnswers;
    let pastTenseAnswers = newPrompt.pastTenseAnswers;

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

    return $btnWords;
  }

  getHelpTable() {
    let $tblHelp = null;
    if ( this.state.isPresent ) {
      $tblHelp =
      <table className="table is-striped">
        <tbody>
          <tr>
            <td>I</td>
            <td>Am</td>
          </tr>
          <tr>
            <td>You</td>
            <td>Are</td>
          </tr>
          <tr>
            <td>He/She/It</td>
            <td>Is</td>
          </tr>
          <tr>
            <td>We/They</td>
            <td>Are</td>
          </tr>
        </tbody>
      </table>
    } else {
      $tblHelp =
      <table id="tblHelp" className="table is-striped">
        <tbody>
          <tr>
            <td>I</td>
            <td>Was</td>
          </tr>
          <tr>
            <td>You</td>
            <td>Were</td>
          </tr>
          <tr>
            <td>He/She/It</td>
            <td>Was</td>
          </tr>
          <tr>
            <td>We/They</td>
            <td>Were</td>
          </tr>
        </tbody>
      </table>
    }

    return $tblHelp
  }

  isCorrectWord( e ) {
    let usersAnswer = e.target.innerText.trim();
    let that = this;
    if ( usersAnswer === this.state.prompt.pastTenseAnswer && this.state.prompts.length > 0 && !this.state.isPresent || usersAnswer === this.state.prompt.presentTenseAnswer && this.state.prompts.length > 0 && this.state.isPresent ) {
      let correctAnswerCount = this.state.numberOfCorrectAnswers;
      this.setState({
        numberOfCorrectAnswers: correctAnswerCount +=1
      })
      this.animateHeartIcons( this.state.numberOfCorrectAnswers );
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

  // isPresent() {
  //   let level = document.querySelector('.select option:checked').innerText;
  //   let pastOrPresent = document.querySelector('.is-selected').innerText;
  //   let prompts = getLevelOneLessonData();
  //   pastOrPresent = ( pastOrPresent === "Present" ) ? false : true;
  //   let newPrompt = getRandomPrompt( prompts );
  //   this.resetHearts();
  //   this.setState({
  //     isPresent: pastOrPresent,
  //     prompts: prompts,
  //     prompt: newPrompt,
  //     numberOfCorrectAnswers: 0,
  //     $btnWords: this.createWordButtons( newPrompt, pastOrPresent )
  //   })
  // }

  toggleHelp() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    if ( !_.isUndefined( this.state.prompt ) && !_.isNil( this.state.prompt ) ) {
      let $tblHelp = this.getHelpTable();
      return (
        <div>
          <div className="inner-tabs align-center">
              <a onClick={ this.isPresent } className={ this.state.isPresent ? "is-selected" : "" }>Present</a>
              <a onClick={ this.isPresent } className={ this.state.isPresent ? "" : "is-selected" }>Past</a>
          </div>
          <div className="title is-4">
            <h4 className="directions"><span className="bold">Directions: </span>{ this.state.isPresent ? "Click the present tense button." : "Click the past tense button."  }</h4>
          </div>
          <div className="align-center">
            <img className="PromptImage" src={ this.state.prompt.image }></img>
          </div>
          <div className="align-center">{ this.state.$btnWords }</div>
          <div className="WritingPrompt title is-2 align-center">
            <h1>{ this.state.prompt.sentence }</h1>
          </div>
          <div className="icnDiv align-center">
            { this.state.$icnHearts }
          </div>
          <div className="tblDiv">
            <a onClick={this.toggleHelp} className="help">Need Help?</a>
            <div className={ this.state.isHidden === false ? "tblHelp" : "is-hidden" }>
              { $tblHelp }
            </div>
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

export default LevelOnePrompt;
