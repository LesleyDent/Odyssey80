import React from 'react';
import './styles.scss';
import UncontrolledLottie from '../../components/UncontrolledLottie';

function OptionsButton(props) {
  return (
    <button onClick={() => { props.onOptionClick(props.index) }} className="options-button">
      <p className="options-button__text">{props.text}</p>
    </button>
  );
};

export default OptionsButton
