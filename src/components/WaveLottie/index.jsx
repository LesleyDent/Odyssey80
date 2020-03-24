import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/animations/wave.json';
import './styles.scss';


class WaveLottie extends Component {

  componentDidMount() {
    if (this.props.loadNext && this.props.directory) {
      this.props.loadNext(`${this.props.directory}/paths/0`, 5000);
    }
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className="wave-lottie">
        <Lottie options={defaultOptions} />
      </div>
    )
  }
}

export default WaveLottie