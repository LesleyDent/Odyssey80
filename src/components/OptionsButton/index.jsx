import React from 'react';
import './styles.scss';

function OptionsButton(props) {
  return (
    <button
      onClick={() => { props.onOptionClick(props.index) }}
      className="options-button"
    >
      {props.text}
    </button>
  )
}

export default OptionsButton