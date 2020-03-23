import React from 'react';
import './styles.scss';
import { render } from '@testing-library/react';

function BkgMusic(props) {
  return (
    <div className="bkg-music">
      {props.music === "synth" ?
        <iframe width="130" height="130" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/201052113&color=%2319ccf3&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe> :
        null
      }
    </div>
  )
}

export default BkgMusic
