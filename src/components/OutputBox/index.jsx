import React, { Component } from 'react';
import './styles.scss';
import Typed from 'typed.js';
// import TypeEffect from '../TypeEffect';

export default class OutputBox extends Component {
  render() {
    return (
      <div
        className={this.props.active ? 'output-box active' : 'output-box'}
      >
        <p id="output" className="output-box__dialogue">{this.props.parseMessage()}</p>
        <div className="output-box__controls">
          <button
            onClick={() => { this.props.toggleActive() }}
            className="output-box__button"
          ></button>
          <button className="output-box__button output-box__button--different"></button>
          <button className="output-box__button output-box__button--different"></button>
        </div>
      </div>
    );
  }
}
// TypeEffect strings={this.props.dialogue} /