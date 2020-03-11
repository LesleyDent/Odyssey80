import React, { Component } from 'react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import firebase from 'firebase';
// // Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDvfM-1FFXlINCwrD7s-yxIvS3kGlVug-8",
  authDomain: "capstone-f319f.firebaseapp.com",
  databaseURL: "https://capstone-f319f.firebaseio.com",
  projectId: "capstone-f319f",
  storageBucket: "capstone-f319f.appspot.com",
  messagingSenderId: "727329607431",
  appId: "1:727329607431:web:2264f589077d0bbdf97fa2",
  measurementId: "G-C3GJF55MNS"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);
firebase.database();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogue: 'hey',
      input: false
    };
  };

  handleInputChange = (inputValue) => {
    this.setState({
      ...this.state,
      input: inputValue,
    });
  };

  handleChange = event => {
    event.preventDefault();
    this.handleInputChange(
      event.target.value
    );
  };

  submitInput = (event) => {
    event.preventDefault();
    if (this.state.input) {

      const dbRef = firebase.database().ref(`dialogue/response1`);
      dbRef.on("value", (result) => {
        let value = result.val().split('%%')
        value[1] = this.state.input
        value.join()
        console.log(value);
        this.setState({
          ...this.state,
          input: false,
          dialogue: value
        });
      })
    };
  };

  componentDidMount() {
    const dbRef = firebase.database().ref(`dialogue/greeting/message`);
    dbRef.on("value", (result) => {
      this.setState({
        ...this.state,
        dialogue: result.val()
      });
    })
  }

  render() {

    return (
      <div className="main">
        <div className="main__container">
          <OutputBox dialogue={this.state.dialogue} />
          <InputBox input={this.state.input} handleChange={this.handleChange} submitInput={this.submitInput} />
        </div>
      </div>
    );
  };
}