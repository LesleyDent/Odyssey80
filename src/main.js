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
      dialogue: '',
      input: false,
      directory: 'dialogue/greeting',
      currentPaths: false,
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
    // get userinput  DONE
    // TODO: determine intent w dictionary thing
    // get current paths FRAGILE?
    // TODO: load path that matches intent
    // IN PROGRESS: display message
    // TODO: if path is a ref, load ref

    if (this.state.input) {
      const intent = false;
      const response = firebase.database().ref(`${this.state.directory}`);
      const directory = response.path.pieces_.join('/');
      console.log(this.state.input)
      let currentPath = false;
      let currentPathIndex = 0;

      response.on("value", (result) => {
        let value = result.val();
        const paths = value.paths
        // console.log(response);

        paths.forEach((element, index) => {
          console.log('loop', element)
          let noOptions = ['no', 'nah', 'no way', 'never', "i don't think so", 'sorry', 'ne pas'];
          let yesOptions = ['yes', 'ya', 'yah', 'yeah', 'ye', 'ok', 'okidoki', 'sure', 'for sure', 'uh huh', 'alright', 'aiight', 'why not', 'may as well', 'absolutely', 'sure thing']

          if (!element.intent) {
            currentPathIndex = index;
            currentPath = element;
            return element;

          } else if (noOptions.includes(this.state.input.toLowerCase()) && element.intent === 'no') {
            let currentPath = element;
            this.setState({
              ...this.state,
              input: false,
              dialogue: currentPath.message,
            });

          } else if (yesOptions.includes(this.state.input.toLowerCase()) && element.intent === 'yes') {
            let currentPath = element;
            this.setState({
              ...this.state,
              input: false,
              dialogue: currentPath.message
            });
          };
        });

        if (currentPath) {
          let msg = currentPath.message;
          if (msg.indexOf('%%') > -1) {
            msg = msg.split('%%');
            msg[1] = this.state.input;
            msg.join();
          };
          this.setState({
            ...this.state,
            input: false,
            dialogue: msg,
            directory: `${directory}/paths/${currentPathIndex}`,
            currentPaths: value
          });
        };
      });

      // msg.on("value", (result) => {
      //   // let value = result.val().split('%%')
      //   // value[1] = this.state.input
      //   // value.join()
      //   console.log(result.val());
      //   this.setState({
      //     ...this.state,
      //     input: false,
      //     dialogue: result.val(),
      //     // directory: this.state.directory
      //   });
      // })
    };
  };

  componentDidMount() {
    const dbRef = firebase.database().ref(`${this.state.directory}/message`);
    dbRef.on("value", (result) => {
      this.setState({
        ...this.state,
        dialogue: result.val()
      });
    });
  };

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