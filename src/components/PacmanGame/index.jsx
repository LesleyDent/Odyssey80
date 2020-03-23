import React from 'react';
import './styles.scss';
import Pacman from 'pacman-react';

function PacmanGame(props) {
  return (
    <div>
      <div className="pacman__container">
        <Pacman gridSize={10} className="pacman" />
        {/* <button className="options-button" onClick={() => { props.loadNext(props.directory, 100) }}><p className="options-button__text">End Distraction</p></button> */}
      </div>
    </div>
  )
}

export default PacmanGame