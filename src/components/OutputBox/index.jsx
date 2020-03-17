import React, { Component } from 'react';
import './styles.scss';

export default class OutputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    }
  }

  toggleActive = () => {
    this.setState({
      ...this.state,
      active: !this.state.active,
    })
  }

  // this.props.typeEffect(this.props.dialogue)
  render() {
    return (
      <div
        className={this.state.active ? 'output-box active' : 'output-box'}
      >
        <p id="output" className="output-box__dialogue">{this.props.dialogue}</p>
        <div className="output-box__controls">
          <button
            onClick={this.toggleActive}
            className="output-box__button"
          ></button>
          <button className="output-box__button output-box__button--different"></button>
          <button className="output-box__button output-box__button--different"></button>
        </div>
      </div>
    );
  }
}