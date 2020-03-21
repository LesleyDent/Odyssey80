import React, { Component } from 'react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import firebase from 'firebase';
import './main.scss';
import './styles/partials/partials.scss';
import Options from './components/Options';
import MatrixEffect from './components/MatrixEffect';
import BkgMusic from './components/BackgroundMusic';
import IntensifyMusic from './components/IntensifyMusic';
import Cube from './components/Cube';
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
      options: [],
      directory: 'dialogue/greeting',
      // currentPaths: false,
      cue: {
        animation: false,
        music: false
      },
      actions: {}
    };
  };

  // typeEffect = (text) => {
  //   if (this.state.outputEl) {
  //     const element = document.querySelector('#output');
  //     console.log("TEXT EFFECT", element)
  //     let speed = 75;
  //     element.textContent = "";

  //     let i = 0;
  //     let timer = setInterval(() => {
  //       if (i < text.length) {
  //         this.state.outputEl.append(text.charAt(i));
  //         i++;
  //       } else {
  //         clearInterval(timer);
  //       }
  //     }, speed);
  //   }
  // }

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
  // how to get event.target.value without updating the value every time it inputs?
  // compare things against prevstate and only render when they change?..

  submitInput = (event) => {
    event.preventDefault();
    // display intro message
    // TODO: if path is a ref, load ref
    // TODO: create HELP and other random option responses
    if (this.state.input) {
      const data = this.getFirebaseData();
      this.updateGame(data);
    }
  };

  getFirebaseData = (directory) => {
    const firebaseData = firebase.database().ref(directory || this.state.directory);
    return firebaseData;
  }

  parseMessage = () => {
    let message = this.state.dialogue;
    if (message.indexOf('%%') > -1) {
      let messageArray = message.split('%%');
      let memory = messageArray[1].toLowerCase();
      messageArray[1] = this.state.memory[memory];
      return messageArray.join('');
    };
    return message;
  }

  onOptionClick = (index) => {
    let data = this.getFirebaseData(`${this.state.directory}/paths/${index}`);
    this.updateGame(data);
  }

  updateGame = (firebaseData) => {
    const response = firebaseData;
    const directory = response.path.pieces_.join('/');
    let currentPath = false;
    let currentPathIndex = 0;

    response.on("value", (result) => {
      let value = result.val();
      const paths = value.paths ? value.paths : false;

      if (paths) {
        paths.forEach((element, index) => {
          let noOptions = ['no', 'nah', 'no way', 'never', "i don't think so", 'sorry', 'ne pas', 'hell no', 'no can do', 'nope', 'no chance', 'like hell'];
          let yesOptions = ['yes', 'yep', 'yip', 'yup', 'sure thing', 'ya bud', 'ya', 'yah', 'yeah', 'ye', 'ok', 'k', 'okidoki', 'sure', 'for sure', 'uh huh', 'alright', 'aiight', 'why not', 'may as well', 'absolutely', 'sure thing', 'heck yes', 'most definitely', 'k']
          let comboOptions = ['2457', '2475', '2547', '2574', '2745', '2754', '4257', '4275', '4527', '4572', '4725', '4752', '5247', '5274', '5427', '5472', '5724', '5742', '7245', '7254', '7425', '7452', '7524', '7542'];

          if (!element.intent) {
            currentPathIndex = index;
            currentPath = element;
          } else {
            if (element.intent === 'intro') {
              currentPath = element;
            } else if (noOptions.includes(this.state.input.toLowerCase()) && element.intent === 'no') {
              currentPath = element;
            } else if (yesOptions.includes(this.state.input.toLowerCase()) && element.intent === 'yes') {
              currentPath = element;
            } else if (this.state.input.toLowerCase() === 'ready' && element.intent === 'yes') {
              currentPath = element;
            } else if (this.state.input === 'ok' && element.intent === 'correct') {
              currentPath = element;
            } else if (this.state.input !== 'ok' && element.intent === 'incorrect') {
              currentPath = element;
            } else if (this.state.input && element.intent === 'anything') {
              currentPath = element;
            } else if (comboOptions.includes(this.state.input.toLowerCase()) && element.intent === 'goodCombo') {
              currentPath = element;
            } else if (!comboOptions.includes(this.state.input.toLowerCase()) && element.intent === 'badCombo') {
              currentPath = element;
            } else if (element.intent === 'age') {
              currentPath = element;
            } else if (element.intent === 'eyeColor') {
              currentPath = element;
            } else if (element.intent === 'surname') {
              currentPath = element;
              console.log(currentPath)
            } else if (this.state.input === 'maybe' && element.intent === 'maybe') {
              //TODO Fix deep path issue
              console.log('maybe')
              currentPath = element;
            }
          };
          if (element.actions) {
            if (element.actions.updateTitle) {
              document.title = element.actions.updateTitle
            }
          }
        });
      } else if (value.ref) {
        currentPath = value;
      }

      let randomMsg = false
      if (currentPath.altmessage) {
        let randomIndex = Math.floor(Math.random() * (currentPath.altmessage.length));
        randomMsg = currentPath.altmessage[randomIndex]
      }
      // If a 'ref' exists, load firebase data and update 
      if (currentPath && currentPath.ref) {
        this.loadfbRef(currentPath, randomMsg);
      } else if (currentPath && currentPath.message && !currentPath.ref) {
        this.loadfbPath(currentPath, currentPathIndex, directory);
      };
    });
  }

  loadfbRef = (currentPath, randomMsg) => {
    const refData = this.getFirebaseData(currentPath.ref);
    refData.on("value", (result) => {
      const refValue = result.val();
      this.setState(prevState => ({
        ...this.state,
        dialogue: randomMsg ? refValue[randomMsg] : refValue.message,
        directory: currentPath.ref,
        input: false,
        options: refValue.options || [],
        cue: {
          animation: refValue.cue && refValue.cue.animation ? refValue.cue.animation : this.state.cue.animation,
          music: refValue.cue && refValue.cue.music ? refValue.cue.music : this.state.cue.music
        },
        memory: {
          ...this.state.memory,
          [this.state.currentMemory]: prevState.input
        },
        currentMemory: refValue.remember || false,
        actions: refValue.actions ? refValue.actions : {}
      }))
    });
  }

  loadfbPath = (currentPath, currentPathIndex, directory) => {
    if (this.state.currentMemory) {
      this.setState(prevState => ({
        ...this.state,
        dialogue: currentPath.message,
        directory: `${directory}/paths/${currentPathIndex}`,
        input: false,
        options: currentPath.options || [],
        cue: {
          animation: currentPath.cue && currentPath.cue.animation ? currentPath.cue.animation : this.state.cue.animation,
          music: currentPath.cue && currentPath.cue.music ? currentPath.cue.music : this.state.cue.music
        },
        memory: {
          ...this.state.memory,
          [this.state.currentMemory]: prevState.input
        },
        currentMemory: currentPath.remember || false,
        actions: currentPath.actions ? currentPath.actions : {}
      }))
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(this.state.directory);
    dbRef.on("value", (result) => {
      const storeResult = result.val()
      this.setState({
        ...this.state,
        outputEl: document.querySelector('#output'),
        dialogue: storeResult.message,
        currentMemory: storeResult.remember,
        memory: {
          ...this.state.memory,
        }
      });
    });
  };

  componentDidUpdate() {
    if (this.state.actions.updateTitle) {
      document.title = this.state.actions.updateTitle
    } else {
      document.title = 'Odyssey80'
    }
  }

  render() {

    return (
      <div className="main">
        <div className="main__container">
          <OutputBox typeEffect={this.typeEffect} dialogue={this.state.dialogue} parseMessage={this.parseMessage} />
          <InputBox input={this.state.input} handleChange={this.handleChange} submitInput={this.submitInput} />
          {/* <Cube options={this.state.options} onOptionClick={this.onOptionClick} /> */}
          <Options options={this.state.options} onOptionClick={this.onOptionClick} />
        </div>
        {this.state.cue.animation === 'matrix' ? <MatrixEffect /> : null}
        {/* {this.state.cue.music === 'synth' ? <BkgMusic /> : null} */}
        {/* {this.state.cue.music === 'intensify' ? <IntensifyMusic /> : null} */}
        <div className="main__border-bottom"></div>
      </div>
    );
  };
}