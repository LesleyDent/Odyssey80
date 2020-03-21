import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/animations/cube.json'
import './styles.scss';

export default class UncontrolledLottie extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      innerText: this.props.text,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className='lottie'>
        <Lottie options={defaultOptions}
          height={200}
          width={200}
        />
      </div>
    )
  }
}