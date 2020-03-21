import React from 'react';
import './styles.scss';
import Pacman from 'pacman-react';

function PacmanGame() {
  return (
    <div>
      <div>
        <Pacman className="pacman" />
        <button>End Distraction</button>
      </div>
    </div>
  )
}

export default PacmanGame