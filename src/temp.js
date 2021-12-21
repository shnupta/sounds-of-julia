// Hit the gear icon to the left of JS in the header to open JavaScript settings

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        audio: {
          sound: null,
          soundName: null,
          currentlyPlaying: null 
        }
      }
    }
    
    playSound(id) {
      if (this.state.audio.currentlyPlaying) {
        let snd = this.state.audio.sound;
        snd.pause();
      }
      let sound = this.props.sounds.find(sound => { return sound.id === id});
      let snd = new Audio(sound.soundURL);
      this.setState({ audio: { sound: snd, soundName: sound.soundName, currentlyPlaying: true }});
      snd.play();
      
      let data = [...this.props.sounds];
      const index = data.findIndex(obj => obj.soundName === sound.soundName);
      data[index].count += 1;
      data[index].isPlaying = true;
      this.setState(data);
      
      snd.addEventListener('ended', this.soundListener.bind(this, data, index, snd));
    }
    
    soundListener(data, index, snd) {
      const newData = [ ...data ];
      newData[index].isPlaying = false;
      this.setState(newData);
      snd.removeEventListener('ended', this.soundListener);
    } 
    
    renderSounds() {
      return this.props.sounds.map(sound => {
        return <Sound key={sound.id} sound={sound} audio={this.state.audio} playSound={this.playSound.bind(this)} />
      })
    }
    render() {
      return (
        <div className="appContainer">
          {this.renderSounds()}
        </div>
      )
    }
  };
  
  class Sound extends React.Component {
    render() {
      let speakerStyle = 'fa fa-volume-off fa-3x';
      if (this.props.sound.isPlaying && this.props.sound.soundName === this.props.audio.soundName && this.props.audio.currentlyPlaying) {
        speakerStyle += 'fa fa-volume-up fa-3x';
      }
      return (
        <div className='sound-card'
          onClick={() => this.props.playSound(this.props.sound.id)}>
          <h3>{this.props.sound.soundName}</h3>
          <div>
            <div className="image-container">
              <i className={speakerStyle} aria-hidden="true"></i>
            </div>
            <div className="count">{this.props.sound.count}</div>
          </div>
        </div>
      );
    }
  }
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sounds: [
          { id: 1, soundName: 'Introduction', soundURL: 'https://dl.dropboxusercontent.com/s/52wovsx7v2xrsyg/oh-hi-there.m4a', count: 0, isPlaying: false }, 
          { id: 2, soundName: 'Munchdew', soundURL: 'https://dl.dropboxusercontent.com/s/bciko68hn6vxfi5/munchdew.m4a', count: 0, isPlaying: false },
          { id: 3, soundName: 'Uhh Oops', soundURL: 'https://dl.dropboxusercontent.com/s/uah7h53h85iewgz/uh-oops.m4a', count: 0, isPlaying: false },
          { id: 4, soundName: 'Hufflepuff', soundURL: 'https://dl.dropboxusercontent.com/s/uxh2dg6u5feqwcc/hufflepuff.m4a', count: 0, isPlaying: false },
          { id: 5, soundName: 'Struck by Lightning', soundURL: 'https://dl.dropboxusercontent.com/s/323rhnwp9bnglmj/struck-by-lightning.m4a', count: 0, isPlaying: false },
          { id: 6, soundName: 'Primal Noises', soundURL: 'https://dl.dropboxusercontent.com/s/mh53hc4v5vfil2r/primal-noises.m4a', count: 0, isPlaying: false },
          { id: 7, soundName: 'Family', soundURL: 'https://dl.dropboxusercontent.com/s/44wlc2ifqf20qzt/family.m4a', count: 0, isPlaying: false },
          { id: 8, soundName: 'Lazer', soundURL: 'https://dl.dropboxusercontent.com/s/s70hruqm15jd7qc/lazer.m4a', count: 0, isPlaying: false },
          { id: 9, soundName: 'About Staying', soundURL: 'https://dl.dropboxusercontent.com/s/tpdoeh03q26soil/stay-as-little-as-possible.m4a', count: 0, isPlaying: false },
          { id: 10, soundName: 'Terrible', soundURL: 'https://dl.dropboxusercontent.com/s/ep463jwi2y99gfw/terrible.m4a', count: 0, isPlaying: false },
          { id: 11, soundName: 'Win an Award', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false }
        ]
      }
    }
      render() {
        return (
          <div>
            <h1>React Soundboard</h1>
            <Board sounds={this.state.sounds} audio={this.state.audio} />
            <p>Special thanks to <a href="https://twitter.com/manifoldkaizen">Stephen Fox</a> for the help with toggling icons and <a href='https://twitter.com/gwmccull'>Garrett McCullough</a> helping me understand event listeners and memory leak!</p>
          </div>
        );
      }
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));