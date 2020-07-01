import React from 'react';
import './styles.scss';

function RetryButton(props) {
  return (
    <button onClick={() => { props.loadNext(path) }} className="retry-button2">
      <p className="retry-button__text">Retry</p>
    </button>
  );
};

export default RetryButton