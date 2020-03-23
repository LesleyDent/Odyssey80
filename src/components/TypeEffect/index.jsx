import React, { Component } from 'react';
// import './styles.scss';
import Typed from 'typed.js';

export default class TypeEffect extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const parsedOptions = this.props.parseMessage();
    this.typed = new Typed(this.el, parsedOptions);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dialogue !== this.props.dialogue) {
      this.typed.destroy();
      const parsedOptions = this.props.parseMessage();
      this.typed = new Typed(this.el, parsedOptions);
    }
  }

  componentWillUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
  }

  render() {
    return (
      <span
        style={{ whiteSpace: 'pre-line' }}
        ref={(el) => { this.el = el; }}
      />
    );
  }
}