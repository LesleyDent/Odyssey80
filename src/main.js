import React, { Component } from 'react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import firebase from 'firebase';
import './main.scss'
import './styles/partials/global.scss'
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
firebase.database();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogue: '',
      input: false,
      currentMemory: false,
      memory: {},
      directory: 'dialogue/greeting',
      currentPaths: false,
    };
  };

  typeEffect = (element) => {
    console.log(element)
    let speed = 75;
    let text = element.innerHTML;
    element.innerHTML = "";

    let i = 0;
    let timer = setInterval(() => {
      if (i < text.length) {
        element.append(text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }




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
    // DONE:
    // get userinput
    // load path that matches intent
    // determine intent w dictionary thing
    // display message
    // FRAGILE: get current paths
    // FRAGILE: if path is a ref, load ref
    // TODO: create HELP and other random option responses
    // DONE: remember elements

    if (this.state.input) {
      const intent = false;
      const response = firebase.database().ref(`${this.state.directory}`);
      const directory = response.path.pieces_.join('/');
      let currentPath = false;
      let currentPathIndex = 0;

      response.on("value", (result) => {
        let value = result.val();
        const paths = value.paths

        paths.forEach((element, index) => {
          console.log('loop', element)
          let noOptions = ['no', 'nah', 'no way', 'never', "i don't think so", 'sorry', 'ne pas', 'hell no'];
          let yesOptions = ['yes', 'ya', 'yah', 'yeah', 'ye', 'ok', 'okidoki', 'sure', 'for sure', 'uh huh', 'alright', 'aiight', 'why not', 'may as well', 'absolutely', 'sure thing', 'heck yes']

          if (!element.intent) {
            currentPathIndex = index;
            currentPath = element;
            return element;

          } else if (noOptions.includes(this.state.input.toLowerCase()) && element.intent === 'no') {
            currentPath = element;

          } else if (yesOptions.includes(this.state.input.toLowerCase()) && element.intent === 'yes') {
            currentPath = element;

          };
        });

        if (currentPath) {
          let msg = currentPath.message;
          if (msg.indexOf('%%') > -1) {
            msg = msg.split('%%');
            msg[1] = this.state.input;
            msg.join();
          };

          if (this.state.currentMemory) {
            console.log({ [this.state.currentMemory]: this.state.input })
            this.setState(prevState => ({
              ...this.state,
              dialogue: msg,
              directory: `${directory}/paths/${currentPathIndex}`,
              currentPaths: value,
              input: false,
              memory: {
                ...this.state.memory,
                [this.state.currentMemory]: prevState.input
              },
              currentMemory: false
            }))
          } else {
            this.setState({
              ...this.state,
              input: false,
              dialogue: msg,
              directory: `${directory}/paths/${currentPathIndex}`,
              currentPaths: value
            });
          }
        };
      });
    };
  };

  componentDidMount() {
    const dbRef = firebase.database().ref(this.state.directory);
    dbRef.on("value", (result) => {
      console.log(result.val())
      const storeResult = result.val()
      this.setState({
        ...this.state,
        dialogue: storeResult.message,
        currentMemory: storeResult.remember,
        memory: {
          ...this.state.memory,
        }
      });
    });
  };

  render() {

    return (
      <div className="main">
        <div className="main__container">
          <OutputBox onChange={this.typeEffect} dialogue={this.state.dialogue} />
          <InputBox input={this.state.input} handleChange={this.handleChange} submitInput={this.submitInput} />
        </div>
        <div className="main__border-bottom"></div>
      </div>
    );
  };
}