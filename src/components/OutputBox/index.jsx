import React, { Component } from 'react';
import './styles.scss';

export default class OutputBox extends Component {
  constructor(props) {
    super(props)
  }
  // this.props.typeEffect(this.props.dialogue)
  render() {
    return (
      <div className="output-box">
        <p id="output" className="output-box__dialogue">{this.props.dialogue}</p>
      </div>
    );
  }
}