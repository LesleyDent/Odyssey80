import React from 'react';
import './styles.scss';

function Cube(props) {
  return (
    <div onClick={() => { props.onOptionClick(props.index) }} class="wrap">
      <div class="cube">
        <button className="cube-button">
          <div class="front">{props.text}</div>
          <div class="back"></div>
          <div class="top"></div>
          <div class="bottom"></div>
          <div class="left"></div>
          <div class="right"></div>
        </button>
      </div>
    </div>
  )
}

export default Cube
