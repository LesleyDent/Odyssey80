import React from 'react';
import './styles.scss';
import CreditCard from '../../assets/images/odyssey-credits.jpg'

function Credits() {
  return (
    <div>
      <img className='credits__image' src={CreditCard}></img>
      {/* <h1 className='credits__text'>For more fun stuff, check out my portfolio at lesleydent.com</h1> */}
    </div>
  )
}

export default Credits;