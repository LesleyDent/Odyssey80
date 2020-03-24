import React from 'react';
import './styles.scss';

function OptionsButton(props) {
  return (
    <button onClick={() => { props.onOptionClick(false, props.index) }} className="options-button2">
      <p className="options-button__text">{props.text}</p>
    </button>
  );
};

export default OptionsButton