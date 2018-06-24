import React, { Component } from 'react';
import HungryBusinesswoman from './images/HungryBusinesswoman.jpg';
import { getLevelOneLessonData, getLevelTwoLessonData } from './Data.js';
import LevelOnePrompt from './LevelOnePrompt.js';
import LevelTwoPrompt from './LevelTwoPrompt.js';
import LevelThreePrompt from './LevelThreePrompt.js';
import LevelFourPrompt from './LevelFourPrompt.js';
import LevelFivePrompt from './LevelFivePrompt.js';
import _ from 'lodash';

class WritingPrompt extends Component {
  constructor(props) {
  super(props);
  this.state = {
    sentence: "",
    correctWord: "is",
    level: "1",
    userFeedback: "",
    levelOneFeedback: "",
    levelTwoPrompts: [],
    levelOnePrompts: [],
    randomSentence: {},
    numberOfCorrectAnswers: 0,
    lesson: {},
    firstSentence: false,
    numberOfTotalPrompts: 0
    };

this.showHighlightedWord = this.showHighlightedWord.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
this.isCorrectSentence = this.isCorrectSentence.bind(this)
this.handleLevelChange = this.handleLevelChange.bind(this);
this.getNewPrompt = this.getNewPrompt.bind(this);
this.increaseCorrectAnswerCount = this.increaseCorrectAnswerCount.bind(this);
this.getLevel1Data = this.getLevel1Data.bind(this);
this.createLevelDropdown = this.createLevelDropdown.bind(this);
}

getLevel1Data( val ) {
  console.log( val );
}
//Level: 2
//Usage: When a user submits a correct answer, increaseCorrectAnswerCount increases the numberOfCorrectAnswers
//setState: numberOfCorrectAnswers increased by 1
increaseCorrectAnswerCount() {
  let numOfCorrectAnswers = this.state.numberOfCorrectAnswers;
  let correctAnswerCount = numOfCorrectAnswers += 1;
  this.setState({
    numberOfCorrectAnswers: correctAnswerCount
  })
}

//Level: 1
//Usage: When a user clicks on a highlighted verb, showHighlightedWord displays the past tense
//setState: correctWord, the 'opposite' of the current word. userFeedback, the congratulatory message
showHighlightedWord() {
  let word = this.state.correctWord === "is" ? "was" : "is";
  let feedback = this.state.correctWord === "was" ? "" : "Great job!";
  this.setState({
    correctWord: word,
    userFeedback: feedback
  })
}

//Level: 2
//Usage: When a user clicks Submit, getNewPrompt is used to retrieve a new unique prompt the user hasn't seen yet
//setState: A copy of the prompts array with the already answered prompt removed
getNewPrompt( indexOfAlreadyUsedPrompt ) {
  let stateOfLevelTwoPrompts = this.state.levelTwoPrompts.slice();
  //Remove the prompt that the user has seen and set state so users don't see the same question twice
  stateOfLevelTwoPrompts.splice( indexOfAlreadyUsedPrompt, 1)
  this.setState({
    levelTwoPrompts: stateOfLevelTwoPrompts
  })

//If there are prompts the user hasn't answered yet, select a random one for the user
  if ( stateOfLevelTwoPrompts.length > 0 ) {
    let randomPrompt = stateOfLevelTwoPrompts[ Math.floor( Math.random() * stateOfLevelTwoPrompts.length ) ];
    if ( randomPrompt.sentence !== this.state.lesson.sentence ) {
      this.componentDidMount( this.state.lesson.level, randomPrompt )
    }
  }
}

//Needs documentation
isCorrectSentence( targetWord, indexOfCorrectWord, correctWordsArray, promptWordsArray ) {
  let usersWord = correctWordsArray.splice( indexOfCorrectWord, 1 );
  promptWordsArray.splice( indexOfCorrectWord, 1 );
  let usersPhraseWithoutTargetWord = correctWordsArray.join(" ");
  let promptWithoutTargetWord = promptWordsArray.join(" ");

  if ( usersWord[0] === targetWord && usersPhraseWithoutTargetWord === promptWithoutTargetWord  ) {
    return true
  } else {
    return false
  }
}

//Needs documentation
handleLevelChange( e ) {
  this.setState({
    level: e.target.value
  })
}

//Needs documentation
handleSubmit() {
  let usersSentence = document.querySelector(".userInput").value.toLowerCase().trim();
  let userWords = usersSentence.split(" ");
  let prompt = document.querySelector(".WritingPrompt").innerText.toLowerCase().trim();
  let promptWords = prompt.split(" ");
  let correctArray = [];
  let incorrectArray = [];
  let indexOfSentenceInSentenceArray;

  for ( let i = 0; i < userWords.length; i++ ) {
      if ( userWords[i] === this.state.lesson.answer && promptWords[i] === this.state.lesson.wordToChange ) {
        correctArray.push( userWords[i] )
      } else if ( userWords[i] !== promptWords[i]) {
        incorrectArray.push( userWords[i] )
      } else {
        correctArray.push( userWords[i] )
      }
    }

  let indexOfCorrectWord = correctArray.indexOf( this.state.lesson.answer ) ;
  let sentenceIsCorrect = this.isCorrectSentence( this.state.lesson.answer, indexOfCorrectWord, correctArray, promptWords);
  let numOfCorrectAnswers = this.state.numberOfCorrectAnswers;
  if ( sentenceIsCorrect && this.state.levelTwoPrompts.length === 1 ) {
    this.setState({
      userFeedback: "Lesson Complete!",
      numberOfCorrectAnswers: ( numOfCorrectAnswers < this.state.numberOfTotalPrompts ) ? numOfCorrectAnswers += 1 : this.state.numberOfCorrectAnswers
    })
  } else if ( sentenceIsCorrect ) {
    document.querySelector(".userInput").value = "";
    this.increaseCorrectAnswerCount();
    _.forEach( this.state.levelTwoPrompts, function( levelTwoPrompt, i ) {
        let isUsersCurrentSentence = levelTwoPrompt.sentence.toLowerCase().includes( prompt );
        if ( isUsersCurrentSentence ) {
          indexOfSentenceInSentenceArray = i;
        }
    });

    this.getNewPrompt( indexOfSentenceInSentenceArray );
    this.setState({
      userFeedback: ""
    })
  } else {
    this.setState({
      userFeedback: "Try Again!"
    })
  }
}

componentDidMount( level, newLevelTwoPrompt, sentencesCopy ) {
  //Change name of randomSentence to randomPrompt or newPrompt
  let newPrompt = {};
  let lesson = {};
  let lessonLevel = ( level === undefined ) ? "1" : level;

  if ( this.state.levelOnePrompts.length === 0 ) {
    let levelOnePrompts = getLevelOneLessonData();
    let levelTwoPrompts = getLevelTwoLessonData();

    this.setState({
      levelTwoPrompts: levelTwoPrompts,
      levelOnePrompts: levelOnePrompts,
      numberOfTotalPrompts: levelTwoPrompts.length
    })
  }

  if ( newLevelTwoPrompt === undefined ) {
    newPrompt = this.state.levelTwoPrompts[ Math.floor( Math.random() * this.state.levelTwoPrompts.length ) ];
  } else {
    newPrompt = newLevelTwoPrompt
  }

  switch( lessonLevel ) {
    case "1":
      lesson.directions = <h4 className="directions"><span className="bold">Directions:</span> Click on the highlighted word.</h4>;
      lesson.sentence = <h1>The businesswoman <span onClick={this.showHighlightedWord} className="is-highlighted">{ this.state.correctWord }</span> hungry.</h1>;
      lesson.image = HungryBusinesswoman;
      lesson.level = "1";
      // this.setState({
      //   lesson: <LevelOnePrompt/>
      // })
      break;
    case "2":
        lesson.directions = <h4 className="directions"><span className="bold">Directions:</span> Retype the sentence using the past tense of the highlighted word.</h4>;
        lesson.sentence = newPrompt.sentence;
        lesson.image = newPrompt.image;
        lesson.wordToChange = newPrompt.word
        lesson.answer = newPrompt.answer
        lesson.level = "2";
        this.setState({
          lesson: lesson
        })
      break;
    case "3":
        lesson.directions = ""
        lesson.sentence = "Level 3 is Under Construction";
        lesson.image = HungryBusinesswoman;
        lesson.level = "3";
        this.setState({
          lesson: lesson
        })
      break;
    case "4":
        lesson.directions = "";
        lesson.sentence = "Level 4 is Under Construction"
        lesson.image = HungryBusinesswoman;
        lesson.level = "4";
        this.setState({
          lesson: lesson
        })
    break;
    case "5":
        lesson.directions = ""
        lesson.sentence = "Level 5 is Under Construction";
        lesson.image = HungryBusinesswoman;
        lesson.level = "5";
        this.setState({
          lesson: lesson
        })
      break;
    default:
      break;
  }
}

createLevelDropdown() {
let dropdown =
<div className="field is-horizontal">
    <label className="label is-large">Level:</label>
    <div className="control">
      <div className="select is-info">
        <select id="levelDropdown" onChange={ this.handleLevelChange }>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
</div>
return dropdown
}
// if ( this.state.level !== "1" ) {
//   return (
//     <div>
//       {dropdown}
//       <div className="title is-4">{ this.state.lesson.directions }</div>
//       <div className="align-center"><img className="PromptImage" alt="Businesswoman Eating" src={ this.state.lesson.image }></img></div>
//       <div className="WritingPrompt title is-2 align-center">{ this.state.lesson.sentence }</div>
//       <div>{ userInput }</div>
//       <div className="align-center">
//         <h1 className={ this.state.userFeedback === "Try Again!" ? "title is-1 is-red" : "title is-1 is-green" }>{ this.state.userFeedback }</h1>
//         <h1 className={ this.state.numberOfCorrectAnswers !== 0 ? "title is-1 is-green" : "title is-1" }>Correct: { this.state.numberOfCorrectAnswers + "/" + this.state.numberOfTotalPrompts }</h1>
//       </div>
//     </div>
//   );
// } else {
//   return(
//     <div>
//       {dropdown}
//       <LevelOnePrompt/>
//     </div>
//   )
// }
  render() {
    let userInput;
    let dropdown = this.createLevelDropdown()
    if ( this.state.level === "2" ) {
      userInput =
      <div className="field">
        <div className="control" >
          <input className="userInput input is-large is-info" placeholder="Fix the sentence using past tense"></input>
          <button className="button is-large is-info" onClick={ this.handleSubmit }>Submit</button>
          <div className="title is-1 is-green align-center">{ this.state.lesson.feedback }</div>
        </div>
      </div>
    }

    switch( this.state.level ) {
      case "1":
        return (
          <div>
            {dropdown}
            <LevelOnePrompt/>
          </div>
        )
          break;
      case "2":
        return (
          <div>
            {dropdown}
            <LevelTwoPrompt/>
          </div>
        )
        break;
      case "3":
        return (
          <div>
            {dropdown}
            <LevelThreePrompt/>
          </div>
        )
        break;
      case "4":
        return (
          <div>
            {dropdown}
            <LevelFourPrompt/>
          </div>
        )
      case "5":
        return (
          <div>
            {dropdown}
            <LevelFourPrompt/>
          </div>
        )
        break;
      default:
      return (
        <div>
          {dropdown}
          <LevelOnePrompt/>
        </div>
      )
          break;
    }
  }
}

export default WritingPrompt;
