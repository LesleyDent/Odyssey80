import React from 'react';
import './styles.scss';

function RetryButton(props) {
  return (
    <button onClick={() => { props.loadNext(path) }} className="retry-button2">
      <p className="retry-button__text">{props.text}</p>
    </button>
  );
};

export default RetryButton