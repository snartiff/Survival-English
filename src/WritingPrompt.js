import React, { Component } from 'react';
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
      level: "1"
    };
    this.createLevelDropdown = this.createLevelDropdown.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
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

handleLevelChange( e ) {
  this.setState({
    level: e.target.value
  })
}

  render() {
    let dropdown = this.createLevelDropdown()
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
