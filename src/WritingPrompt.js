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
  let ddlLevel =
  <div className="field is-horizontal">
      <label className="label is-large">Level:</label>
      <div className="control">
        <div className="select is-info">
          <select id="levelDropdown" onChange={ this.handleLevelChange }>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
  </div>
  return ddlLevel
}

handleLevelChange( e ) {
  this.setState({
    level: e.target.value
  })
}

  render() {
    let ddlLevel = this.createLevelDropdown()
    switch( this.state.level ) {
      case "1":
        return (
          <div>
            {ddlLevel}
            <LevelOnePrompt/>
          </div>
        )
          break;
      case "2":
        return (
          <div>
            {ddlLevel}
            <LevelTwoPrompt/>
          </div>
        )
        break;
      case "3":
        return (
          <div>
            {ddlLevel}
            <LevelThreePrompt/>
          </div>
        )
        break;
      default:
      return (
        <div>
          {ddlLevel}
          <LevelOnePrompt/>
        </div>
      )
          break;
    }
  }
}

export default WritingPrompt;
