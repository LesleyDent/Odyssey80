import React from 'react';
import './styles.scss';
import OptionsButton from '../OptionsButton';
import Cube from '../Cube';

function Options(props) {
  return (
    <div className="options">
      {props.options.map((option, index) => <OptionsButton key={`option-${index}`} text={option} onOptionClick={props.onOptionClick} index={index} />)}
    </div>
  )
}

export default Options