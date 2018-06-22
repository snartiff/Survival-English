import React, { Component } from 'react';
import WritingPrompt from './WritingPrompt.js';
import './App.css';
import './bulma/bulma.css'
import './font-awesome/css/font-awesome.css'

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
}

  render() {
    return (
      <div className="App">
        <WritingPrompt />
      </div>
    );
  }
}

export default App;
