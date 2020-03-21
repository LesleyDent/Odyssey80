import React, { Component } from 'react';
// import './styles.scss';
import Typed from 'typed.js';

// function TypeEffect(element, speed) {
//   let text = element.innerHTML;
//   element.innerHTML = "";

//   let i = 0;
//   let timer = setInterval(function () {
//     if (i < text.length) {
//       element.append(text.charAt(i));
//       i++;
//     } else {
//       clearInterval(timer);
//     }
//   }, speed);
// }

// let speed = 75;
// let delay = text.length * speed + speed;

// setTimeout(function () {
//   TypeEffect(msg, speed);
// }, delay);


// export default TypeEffect

// export default class TypeEffect extends Component {
//   componentDidMount() {
//     // If you want to pass more options as props, simply add
//     // your desired props to this destructuring assignment.
//     const { strings } = this.props;
//     // You can pass other options here, such as typing speed, back speed, etc.
//     const options = {
//       strings: strings,
//       typeSpeed: 50,
//       backSpeed: 50
//     };
//     // this.el refers to the <span> in the render() method
//     this.typed = new Typed(this.el, options);
//   }

//   // componentWillUnmount() {
//   //   this.typed.destroy();
//   // }

//   render() {
//     return (
//       <></>
//     );
//   }
// }