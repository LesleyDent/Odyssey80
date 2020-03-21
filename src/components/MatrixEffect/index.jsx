import React, { Component } from 'react';
import './styles.scss';

class MatrixEffect extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const img = this.refs.image
    // const p = this.refs.p

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let symbols = '咊⧻ガクシダ7トテヅネ龢咊2ヒオゲヸヷラボ4ㇽ咊ホぐ5アデ#ハ和パ5咊ウギネ和咊ムミ7ヤヸリヹヺベホ咊2ㇹョ和ワロ4ㇼ咊ㇽㇴ咊7';
    symbols = symbols.split('');
    let secretWord = 'BRAINSTATION'
    secretWord = secretWord.split('');


    let font_size = 10;
    let columns = canvas.width / font_size;
    let drops = [];
    for (let x = 0; x < columns; x++)
      drops[x] = 1;

    // let letters = [];
    // for (let x = 0; x < columns; x++)
    //   letters[x] = 1;

    // p.onLoad = () => {
    //   ctx.save();
    //   ctx.translate(100, 100);
    // ctx.rotate(-Math.PI / 2);
    //   ctx.textAlign = "center";
    //   ctx.fillText(secretWord, 150, 100);
    // }

    img.onLoad = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0FF";
      ctx.font = font_size + "px arial";

      for (let i = 0; i < drops.length; i++) {
        // let secretText = secretWord
        let text = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // ctx.fillText(secretText, 150, 90, 500);
        // ctx.rotate(secretText[Math.PI * 2 / (i * 6)]);

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(img.onLoad, 50);
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" />
        <img ref="image" className="hidden" />
        {/* <p ref="p"></p> */}
      </div>
    )
  }
}

export default MatrixEffect