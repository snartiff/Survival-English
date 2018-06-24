import React, { Component } from 'react';
// import { getLevelThreeLessonData } from './Data.js';
import _ from 'lodash';

class LevelThreePrompt extends Component {
  constructor(props) {
  super(props);
  this.state = {
    prompts: []
    };

// this.showHighlightedWord = this.showHighlightedWord.bind(this)
}
componentDidMount( ) {
 // let levelThreePrompts = getLevelThreeLessonData();
 // this.setState({
 //   prompts: levelThreePrompts
 // })
}

  render() {
      return (
        <div className="align-center">
          <h1 className="title is-4 is-bold">Sorry, under construction...</h1>
        </div>
      );
  }
}

export default LevelThreePrompt;
