import React, { Component } from 'react'
import Sound from 'react-sound';
export default class Som extends Component{
    render() {
        return (
          <Sound
            url="https://m.toqueparacelular.com.br/download/Alarme_Nuclear.mp3"
            playStatus={Sound.status.PLAYING}
            playFromPosition={100 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        );
      }

}
