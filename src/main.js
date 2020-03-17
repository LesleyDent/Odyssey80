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
      currentPaths: false,
      cue: {
        animation: false,
        music: false
      },
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

  parseMessage = (message) => {
    if (message.indexOf('%%') > -1) {
      let messageArray = message.split('%%');
      messageArray[1] = this.state.input;
      return messageArray.join('');
    };
    return message;
  }

  onOptionClick = (index) => {
    const data = this.getFirebaseData(`${this.state.directory}/paths/${index}`);
    data.on("value", (result) => {
      const refValue = result.val();
      this.setState(prevState => ({
        ...this.state,
        dialogue: refValue.message,
        directory: `${this.state.directory}/paths/${index}`,
        input: false,
        options: refValue.options || [],
        cue: {
          animation: refValue.cue && refValue.cue.animation ? refValue.cue.animation : false,
          music: refValue.cue && refValue.cue.music ? refValue.cue.music : false
        },
        memory: {
          ...this.state.memory,
          [this.state.currentMemory]: prevState.input
        },
        currentMemory: refValue.memory || false
      }))
    });
  }

  updateGame = (firebaseData) => {
    const response = firebaseData;
    const directory = response.path.pieces_.join('/');
    let currentPath = false;
    let currentPathIndex = 0;

    response.on("value", (result) => {
      let value = result.val();
      const paths = value.paths

      paths.forEach((element, index) => {
        let noOptions = ['no', 'nah', 'no way', 'never', "i don't think so", 'sorry', 'ne pas', 'hell no'];
        let yesOptions = ['yes', 'ya', 'yah', 'yeah', 'ye', 'ok', 'okidoki', 'sure', 'for sure', 'uh huh', 'alright', 'aiight', 'why not', 'may as well', 'absolutely', 'sure thing', 'heck yes']
        let correctOptions = ['34', 'thirty four', 'thirty-four', 'thirtyfour'];

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
          } else if (correctOptions.includes(this.state.input.toLowerCase()) && element.intent === 'correct') {
            currentPath = element;
          } else if (!correctOptions.includes(this.state.input.toLowerCase()) && element.intent === 'incorrect') {
            currentPath = element;
          } else if (this.state.input && element.intent === 'anything') {
            currentPath = element;
          } else if (this.state.input === 'maybe' && element.intent === 'maybe') {
            //TODO Fix deep path issue
            console.log('maybe')
            currentPath = element;
          }
        };
      });

      // If a 'ref' exists, load firebase data and update 
      if (currentPath && currentPath.ref) {
        this.loadfbRef(currentPath);
      } else if (currentPath && currentPath.message && !currentPath.ref) {
        this.loadfbPath(currentPath, currentPathIndex, directory);

      };
    });
  }

  loadfbRef = (currentPath) => {
    const refData = this.getFirebaseData(currentPath.ref);
    refData.on("value", (result) => {
      const refValue = result.val();
      this.setState(prevState => ({
        ...this.state,
        dialogue: refValue.message,
        directory: currentPath.ref,
        input: false,
        options: refValue.options || [],
        cue: {
          animation: refValue.cue && refValue.cue.animation ? refValue.cue.animation : false,
          music: refValue.cue && refValue.cue.music ? refValue.cue.music : false
        },
        memory: {
          ...this.state.memory,
          [this.state.currentMemory]: prevState.input
        },
        currentMemory: refValue.memory || false
      }))
    });
  }

  loadfbPath = (currentPath, currentPathIndex, directory) => {
    let msg = this.parseMessage(currentPath.message);

    if (this.state.currentMemory) {
      // console.log({ [this.state.currentMemory]: this.state.input })
      this.setState(prevState => ({
        ...this.state,
        dialogue: msg,
        directory: `${directory}/paths/${currentPathIndex}`,
        input: false,
        options: currentPath.options || [],
        cue: {
          animation: currentPath.cue && currentPath.cue.animation ? currentPath.cue.animation : false,
          music: currentPath.cue && currentPath.cue.music ? currentPath.cue.music : false
        },
        memory: {
          ...this.state.memory,
          [this.state.currentMemory]: prevState.input
        },
        currentMemory: false
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

  render() {

    return (
      <div className="main">
        <div className="main__container">
          <OutputBox typeEffect={this.typeEffect} dialogue={this.state.dialogue} />
          <InputBox input={this.state.input} handleChange={this.handleChange} submitInput={this.submitInput} />
          <Options options={this.state.options} onOptionClick={this.onOptionClick} />
        </div>
        {this.state.cue.animation === 'matrix' ? <MatrixEffect /> : null}
        {this.state.cue.music === 'synth' ? <BkgMusic /> : null}
        {/* {this.state.cue.music === 'intensify' ? <IntensifyMusic /> : null} */}
        <div className="main__border-bottom"></div>
      </div>
    );
  };
}