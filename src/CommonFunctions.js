import _ from 'lodash';
import { getLevelOneLessonData, getLevelTwoLessonData } from './Data.js'

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

export function isPresent() {
  let level = document.querySelector('.select option:checked').innerText;
  let pastOrPresent = document.querySelector('.is-selected').innerText;
  let prompts = null;
  pastOrPresent = ( pastOrPresent === "Present" ) ? false : true;

  switch( level ) {
    case "1":
      prompts = getLevelOneLessonData();
      break;
    case "2":
      prompts = getLevelTwoLessonData();
      break;
    default:
      break;
  }

  let newPrompt = getRandomPrompt( prompts );

  this.setState({
    isPresent: pastOrPresent,
    prompts: prompts,
    prompt: newPrompt,
    numberOfCorrectAnswers: 0
  })

}
