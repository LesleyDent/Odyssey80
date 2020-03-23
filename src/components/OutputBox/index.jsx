import React, { Component } from 'react';
import './styles.scss';
import PacmanGame from '../PacmanGame';
import BkgMusic from '../BackgroundMusic';
import WaveLottie from '../WaveLottie';
import TypeEffect from '../TypeEffect';

export default class OutputBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={[
          'output-box',
          this.props.active ? 'active' : '',
          this.props.cue.animation === "pacman" ? 'pacman-screen' : this.props.cue.animation === "rewire" ? 'main-screen main-screen--rewire' : 'main-screen',
        ].join(' ')}
      >
        {this.props.cue.animation === 'pacman' ?
          <PacmanGame
            loadNext={this.props.loadNext}
            directory={this.props.directory}
          /> : this.props.cue.animation === "rewire" ?
            <div className="output-box__wires-text"><WaveLottie
              directory={this.props.directory}
              loadNext={this.props.loadNext}
            />
              <p id="output" className="output-box__dialogue">{<TypeEffect parseMessage={this.props.parseMessage} dialogue={this.props.dialogue} />}</p></div>
            :
            <>
              {
                this.props.dialogue ?
                  <p id="output" className="output-box__dialogue">{<TypeEffect parseMessage={this.props.parseMessage} dialogue={this.props.dialogue} />}</p> :
                  null
              }
              <div className="output-box__controls">
                <button
                  onClick={() => { this.props.toggleActive() }}
                  className="output-box__button"
                ></button>
                <button className="output-box__button output-box__button--different bkg-music__button">
                  <BkgMusic music={this.props.cue.music} />
                </button>
                <button className="output-box__button output-box__button--different"></button>
              </div></>
        }
      </div>
    );
  }
}