import React, { Component } from 'react';
// import { getLevelFourLessonData } from './Data.js';
import _ from 'lodash';

class LevelFourPrompt extends Component {
  constructor(props) {
  super(props);
  this.state = {
    prompts: []
    };

// this.showHighlightedWord = this.showHighlightedWord.bind(this)
}
componentDidMount( ) {
 // let levelFourPrompts = getLevelFourLessonData();
 // this.setState({
 //   prompts: levelFourPrompts
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

export default LevelFourPrompt;
