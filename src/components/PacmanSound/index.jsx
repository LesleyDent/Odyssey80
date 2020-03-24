import React, { Component } from 'react'

function PacmanSound() {
  return (
    <div>
      {props.music === "synth" ?
        <iframe width="0" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/782001658%3Fsecret_token%3Ds-YIlDDMZ12km&color=%2300eaff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        : null
      }
    </div>
  );
}

export default PacmanSound;