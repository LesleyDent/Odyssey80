import React, { Component } from 'react'

class PacmanSound extends Component {
  render() {
    return (
      <div>
        <audio ref="audio_tag" src="../../assets/sounds/pacman_beginning.wav" autoPlay />
      </div>
    );
  }
}

export default PacmanSound;