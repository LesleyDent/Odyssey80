import React from 'react';
import './styles.scss';
import Pacman from 'pacman-react';

function PacmanGame() {
  return (
    <div>
      <div className="pacman__container">
        <iframe title="pacman intro theme song" width="0" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/782001658%3Fsecret_token%3Ds-YIlDDMZ12km&color=%2300eaff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        <Pacman gridSize={10} className="pacman" />
      </div>
    </div>
  )
}

export default PacmanGame