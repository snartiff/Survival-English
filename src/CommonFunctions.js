import React, { Component } from 'react';
import _ from 'lodash';
import { getLevelOneLessonData, getLevelTwoLessonData, getLevelThreeLessonData } from './Data.js'
import { handleSubmit } from './LevelThreePrompt.js'

export function animateHeartIcons( numberOfCorrectAnswers ) {
  let $greyHeartIcons = document.querySelectorAll(".fa-heart");
  if ( numberOfCorrectAnswers < this.state.numberOfTotalPrompts ) {
    for ( let i = 0; i <= numberOfCorrectAnswers; i++ ) {
      $greyHeartIcons[i].className = "fa fa-heart fa-lg is-red ";
    }
  }
}

export function createHeartIcons( numberOfTotalPrompts ) {
  let $icnHearts = [];
  for ( let i = 0; i < numberOfTotalPrompts; i++ ) {
    let $icnHeart = <i className="fa fa-heart fa-lg is-white" key={ i }></i>;
    $icnHearts.push( $icnHeart );
  }
  return $icnHearts
}

export function getNewPrompt( unusedPrompts, currentPrompt ) {
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
      prompt: getRandomPrompt( unusedPrompts )
    })
  }
}

export function getRandomPrompt( prompts ) {
  let randomPrompt = prompts[ Math.floor( Math.random() * prompts.length ) ];
  return randomPrompt
}

export function isPresent(e) {
  let clickedLinkText = e.target.innerText;
  let level = document.querySelector('.select option:checked').innerText;
  let currentlyHighlightedText = document.querySelector('.is-selected').innerText;
  let prompts = null;

  let pastOrPresent = ( currentlyHighlightedText === "Present" ) ? false : true;
  this.resetHearts();
//put if statement here for pastOrPresent
  switch( level ) {
    case "1":
      prompts = getLevelOneLessonData();
      break;
    case "2":
      prompts = getLevelTwoLessonData();
      break;
    case "3":
      this.setState({
        usersSentence: "",
      })
      this.handleSubmit();
      prompts = getLevelThreeLessonData();
      break;
    default:
      break;
  }

if ( clickedLinkText != currentlyHighlightedText ) {
  let newPrompt = getRandomPrompt( prompts );
  switch( level ) {
    case "1":
    this.setState({
      isPresent: pastOrPresent,
      prompts: prompts,
      prompt: newPrompt,
      numberOfCorrectAnswers: 0,
      $btnWords: this.createWordButtons( newPrompt, pastOrPresent )
    })
      break;
    case "2":
    this.setState({
      isPresent: pastOrPresent,
      prompts: prompts,
      prompt: newPrompt,
      numberOfCorrectAnswers: 0
    })
      break;
    case "3":
    this.setState({
      isPresent: pastOrPresent,
      prompts: prompts,
      prompt: newPrompt,
      numberOfCorrectAnswers: 0,
      $btnWords: this.createWordButtons( newPrompt, pastOrPresent )
    })
      break;
    default:
      break;
  }
}
}

export function resetHearts() {
  let $icnHearts = document.querySelectorAll('.fa.fa-heart');
  for ( let i = 0; i < $icnHearts.length; i++ ) {
    $icnHearts[i].className = "fa fa-heart fa-lg is-white"
  }
}
