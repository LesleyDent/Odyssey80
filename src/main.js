import React, { Component } from 'react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import firebase from 'firebase';
import './main.scss';
import './styles/partials/partials.scss';
import Options from './components/Options';
import MatrixEffect from './components/MatrixEffect';
import Cube from "./components/Cube";
import AlarmMusic from './components/AlarmMusic';
import WinMusic from './components/WinMusic';
// import RetryButton from './components/RetryButton';

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

const cubes = [
  {
    front: {
      text: 'T',
      style: 'blue',
    },
    back: {
      text: 'D',
      style: 'blue'
    },
    top: {
      text: 'A',
      style: 'yellow'
    },
    bottom: {
      text: 'S',
      style: 'yellow'
    },
    left: {
      text: 'L',
      style: 'pink'
    },
    right: {
      text: 'M',
      style: 'pink'
    }
  },
  {
    front: {
      text: 'F',
      style: 'blue',
    },
    back: {
      text: 'H',
      style: 'blue'
    },
    top: {
      text: 'S',
      style: 'yellow'
    },
    bottom: {
      text: 'P',
      style: 'yellow'
    },
    left: {
      text: 'L',
      style: 'pink'
    },
    right: {
      text: 'Y',
      style: 'pink'
    }
  },
  {
    front: {
      text: 'C',
      style: 'blue',
    },
    back: {
      text: 'E',
      style: 'blue'
    },
    top: {
      text: 'T',
      style: 'yellow'
    },
    bottom: {
      text: 'L',
      style: 'yellow'
    },
    left: {
      text: 'Y',
      style: 'pink'
    },
    right: {
      text: 'G',
      style: 'pink'
    }
  },
  {
    front: {
      text: 'Y',
      style: 'blue',
    },
    back: {
      text: 'B',
      style: 'blue'
    },
    top: {
      text: 'T',
      style: 'yellow'
    },
    bottom: {
      text: 'O',
      style: 'yellow'
    },
    left: {
      text: 'O',
      style: 'pink'
    },
    right: {
      text: 'R',
      style: 'pink'
    }
  }
];
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogue: '',
      currentPath: false,
      input: false,
      currentMemory: false,
      memory: {},
      options: [],
      directory: 'dialogue/greeting',
      cue: {
        animation: false,
        music: false
      },
      actions: {},
      active: true,
    };
  };

  toggleActive = () => {
    this.setState({
      ...this.state,
      active: !this.state.active,
    })
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
    if (this.state.input) {
      const data = this.getFirebaseData();
      this.updateGame(data);
    }
  };

  getFirebaseData = (directory) => {
    const firebaseData = firebase.database().ref(directory || this.state.directory);
    return firebaseData;
  }

  parseMessage = (text = this.state.dialogue) => {
    let message = text;
    let messageArray;
    let messageMap;
    let options = {
      strings: [],
      typeSpeed: 60,
      backSpeed: 25,
      fadeOut: true,
      smartBackspace: false,
      backDelay: 0,
      fadeOutDelay: 500,
    };

    if (message.indexOf('@@') > -1) {
      options.smartBackspace = true;
      options.fadeOut = false;
    }

    var multiSplit = function (str, delimeters) {
      var result = [str];
      if (typeof (delimeters) == 'string')
        delimeters = [delimeters];
      while (delimeters.length > 0) {
        for (var i = 0; i < result.length; i++) {
          var tempSplit = result[i].split(delimeters[0]);
          result = result.slice(0, i).concat(tempSplit).concat(result.slice(i + 1));
        }
        delimeters.shift();
      }
      return result;
    }
    messageArray = multiSplit(message, ['&&', '@@'])

    messageMap = messageArray.map((element) => {
      if (element.indexOf('%%') > -1) {
        let elementArray = element.split('%%');
        let elementArrayMemory = elementArray.map((piece) => {
          if (this.state.memory[piece]) {
            return this.state.memory[piece]
          }
          return piece
        })
        return elementArrayMemory.join('');
      };
      return element;
    });
    messageArray = messageMap;

    options.strings = messageArray;

    return options
  }

  onOptionClick = (path = false, index) => {
    let data = this.getFirebaseData(path ? path : `${this.state.directory}/paths/${index}`);
    this.updateGame(data);
  }

  loadNext = (path, time = 0) => {
    console.log('LOAD NEXT', path, time)
    setTimeout(
      () => {
        let data = this.getFirebaseData(path);
        this.updateGame(data);
      }, time);
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
          let noOptions = ['n', 'no', 'nah', 'no way', 'never', "i don't think so", 'sorry', 'ne pas', 'hell no', 'no can do', 'nope', 'no chance', 'like hell', 'as if'];
          let yesOptions = ['y', 'yes', 'yep', 'yip', 'yup', 'sure thing', 'ya bud', 'ya', 'yah', 'yeah', 'ye', 'ok', 'k', 'okidoki', 'sure', 'for sure', 'uh huh', 'alright', 'aiight', 'why not', 'may as well', 'absolutely', 'sure thing', 'heck yes', 'most definitely', 'of course']
          let comboOptions = ['2457', '2475', '2547', '2574', '2745', '2754', '4257', '4275', '4527', '4572', '4725', '4752', '5247', '5274', '5427', '5472', '5724', '5742', '7245', '7254', '7425', '7452', '7524', '7542'];
          let colorOptions = ['blue', 'green', 'brown', 'hazel', 'black', 'dark brown', 'light brown', 'blue green', 'red', 'grey', 'gray']

          if (!element.intent) {
            currentPathIndex = index;
            currentPath = element;
          } else {
            if (element.intent === 'intro') {
              currentPath = element;
            } else if (this.state.input && noOptions.includes(this.state.input.toLowerCase()) && element.intent === 'no') {
              currentPath = element;
            } else if (this.state.input && yesOptions.includes(this.state.input.toLowerCase()) && element.intent === 'yes') {
              currentPath = element;
            } else if (this.state.input && this.state.input.toLowerCase() === 'ready' && element.intent === 'yes') {
              currentPath = element;
            } else if (this.state.input && this.state.input === 'M4&f2e9' && element.intent === 'correct') {
              currentPath = element;
            } else if (this.state.input && this.state.input !== 'M4&f2e9' && element.intent === 'incorrect') {
              currentPath = element;
            } else if (this.state.input && this.state.input && element.intent === 'anything') {
              currentPath = element;
            } else if (this.state.input && comboOptions.includes(this.state.input.toLowerCase()) && element.intent === 'goodCombo') {
              currentPath = element;
            } else if (this.state.input && !comboOptions.includes(this.state.input.toLowerCase()) && element.intent === 'badCombo') {
              currentPath = element;
            } else if (this.state.input && this.state.input.toLowerCase() === 'odyssey' && element.intent === 'unscrambled') {
              currentPath = element;
            } else if (this.state.input && this.state.input.toLowerCase() !== 'odyssey' && element.intent === 'notunscrambled') {
              currentPath = element;
            } else if (this.state.input && isNaN(this.state.input) === false && element.intent === 'age') {
              currentPath = element;
            } else if (this.state.input && colorOptions.includes(this.state.input.toLowerCase()) && element.intent === 'eyeColor') {
              currentPath = element;
            } else if (element.intent === 'surname') {
              currentPath = element;
            } else if (element.intent === 'abort') {
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
        currentPath: refValue,
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
        currentPath: currentPath,
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

  poweroff = (time = 0) => {
    setTimeout(
      () => {
        this.toggleActive();
      }, time);
    // return (
    //   <RetryButton loadNext={this.loadNext} />
    // )
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(this.state.directory);
    dbRef.on("value", (result) => {
      const storeResult = result.val()
      this.setState({
        ...this.state,
        currentPath: storeResult,
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
      <div className={['main', this.state.cue.animation === 'alarm' || this.state.cue.animation === 'alarmthenpoweroff' ? 'alarm' : '', this.state.cue.animation === 'flippedbuttons' ? 'flippedbuttons' : '', this.state.active ? 'active' : ''].join(' ')} >
        <div className="main__container">
          <OutputBox
            dialogue={this.state.dialogue}
            parseMessage={this.parseMessage}
            toggleActive={this.toggleActive}
            active={this.state.active}
            cue={this.state.cue}
            loadNext={this.loadNext}
            directory={this.state.directory}
          />
          <InputBox
            input={this.state.input}
            handleChange={this.handleChange}
            submitInput={this.submitInput}
            options={this.state.options.length ? true : false}
            active={this.state.active}
          />
          <Options options={this.state.options} onOptionClick={this.onOptionClick} />
        </div>
        {this.state.cue.animation === 'matrix' ? <MatrixEffect /> : null}
        {this.state.cue.animation === 'cubes' ? <div className="cubes">{cubes.map((cube, index) => <Cube key={`cube-${index}`} cube={cube} index={index} />)}</div> : null}
        <div className="main__border-bottom"></div>
        {this.state.active && this.state.cue.animation === 'poweroff' ? this.poweroff(70000) : ''}
        {this.state.active && this.state.cue.animation === 'alarmthenpoweroff' ? this.poweroff(8000) : ''}
      </div>
    );
  };
}