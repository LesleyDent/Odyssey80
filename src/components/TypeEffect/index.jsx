import React from 'react';
import './styles.scss';

function typeEffect(element, speed) {
  var text = element.innerHTML;
  element.innerHTML = "";

  var i = 0;
  var timer = setInterval(function () {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

let speed = 75;
let delay = msg.length * speed + speed;

setTimeout(function () {
  typeEffect(msg, speed);
}, delay);


export default TypeEffect