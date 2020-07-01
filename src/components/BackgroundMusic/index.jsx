import React, { Component } from 'react';
import './styles.scss';

class BkgMusic extends Component {
  render() {

    return (
      <div className="bkg-music">
        {this.props.music === "synth" ?
          <iframe title="upbeat 80s synth music" width="130" height="130" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/781909468%3Fsecret_token%3Ds-PjVnbBO4xeP&color=%2300eaff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
          : this.props.music === "alarm" ?
            <iframe title="alarming 1980s synth music" width="130" height="130" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/299653645&color=%2300eaff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
            : this.props.music === "winmusic" ?
              <iframe title="calm upbeat 80s synth music" width="130" height="130" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/185099896&color=%2300eaff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
              : null
        }
      </div>
    )
  }
}

export default BkgMusic