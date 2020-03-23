import React from 'react';
import './styles.scss';

function Cube(props) {
  return (
    <div className={`cube cube--${props.index}`}>
      <div className={`cube__face cube__face--front cube__face--${props.cube.front.style}`}>
        <span className={`cube__text cube__text--${props.cube.front.style}`}>{props.cube.front.text}</span>
      </div>
      <div className={`cube__face cube__face--back cube__face--${props.cube.back.style}`}>
        <span className={`cube__text cube__text--${props.cube.back.style}`}>{props.cube.back.text}</span>
      </div>
      <div className={`cube__face cube__face--top cube__face--${props.cube.top.style}`}>
        <span className={`cube__text cube__text--${props.cube.top.style}`}>{props.cube.top.text}</span>
      </div>
      <div className={`cube__face cube__face--bottom cube__face--${props.cube.bottom.style}`}>
        <span className={`cube__text cube__text--${props.cube.bottom.style}`}>{props.cube.bottom.text}</span>
      </div>
      <div className={`cube__face cube__face--left cube__face--${props.cube.left.style}`}>
        <span className={`cube__text cube__text--${props.cube.left.style}`}>{props.cube.left.text}</span>
      </div>
      <div className={`cube__face cube__face--right cube__face--${props.cube.right.style}`}>
        <span className={`cube__text cube__text--${props.cube.right.style}`}>{props.cube.right.text}</span>
      </div>
    </ div>
  )
}

export default Cube;
