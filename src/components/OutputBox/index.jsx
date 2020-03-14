import React from 'react';
import './styles.scss';

function OutputBox(props) {
  return (
    <div className="output-box">
      <p
        onChange={(event) => { props.typeEffect(event.target) }}
        className="output-box__dialogue">{props.dialogue}</p>
    </div>
  );
}
export default OutputBox