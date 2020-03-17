import React, { Component } from 'react';
import './styles.scss';

class MatrixEffect extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const img = this.refs.image

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let symbols = "咊⧻ガクシダトテヅネ龢咊2ヒオゲヸヷラボ4ㇽ咊ホぐアデ#ハ和パ5咊ウギネ和咊ムミ7ヤヸリヹヺベホ咊ㇹョ和ワロㇼ咊ㇽㇴ咊7";
    symbols = symbols.split('');

    let font_size = 10;
    let columns = canvas.width / font_size;
    let drops = [];
    for (let x = 0; x < columns; x++)
      drops[x] = 1;

    img.onLoad = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0FF";
      ctx.font = font_size + "px arial";

      for (let i = 0; i < drops.length; i++) {
        let text = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(img.onLoad, 33);
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" />
        <img ref="image" className="hidden" />
      </div>
    )
  }
}

export default MatrixEffect