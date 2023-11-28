let countDown;
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      sessionMinutes: 25,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
      session: "Session",
    };
  }

  //increment break function
  incrementBreakTime = () => {
    if (this.state.breakTime < 60 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
  };

  //Decrement break function
  decrementBreakTime = () => {
    if (this.state.breakTime > 1 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
    }
  };

  //Increment Session Time
  incrementSession = () => {
    if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      this.state.sessionTime < 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: "0" + (parseInt(this.state.sessionTime) + 1),
        sessionSeconds: "00",
      });
    } else if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      parseInt(this.state.sessionTime) >= 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: parseInt(this.state.sessionTime) + 1,
        sessionSeconds: "00",
      });
    }
  };

  //Decrement Session Time
  decrementSession = () => {
    if (
      this.state.sessionTime > 1 &&
      this.state.sessionTime > 10 &&
      this.state.timerIsOn === false
    ) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: this.state.sessionMinutes - 1,
        sessionSeconds: "00",
      });
    } else if (this.state.sessionTime > 1 && this.state.sessionTime <= 10) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: "0" + (this.state.sessionMinutes - 1),
        sessionSeconds: "00",
      });
    }
  };

  //Start-Stop Timer
  timer = () => {
    if (this.state.timerIsOn === false) {
      this.setState({
        timerIsOn: true
      })
      let seconds =
      this.state.sessionMinutes * 60 + parseInt(this.state.sessionSeconds);
      
      const now = Date.now();
      const then = now + seconds * 1000;
      
      countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(this.state.sessionMinutes === "00" && this.state.sessionSeconds === "00") {
          document.getElementById("beep").play();
        }
        if (secondsLeft < 0) {
          clearInterval(countDown);
          this.break();
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    } else {
      clearInterval(countDown);
      let minuteToPause = this.state.sessionMinutes;
      let secondsToPause = this.state.sessionSeconds;
      this.setState({
        timerIsOn: false,
        sessionMinutes: minuteToPause,
        sessionSeconds: secondsToPause,
      });
    }
  };

  //Display the timer
  displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    if (remainderSeconds >= 10 && minutes >= 10) {
      this.setState({
        sessionMinutes: minutes,
        sessionSeconds: remainderSeconds,
      });
    } else if (remainderSeconds <= 9) {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: "0" + remainderSeconds,
      });
    } else {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: remainderSeconds,
      });
    }
  };

  //Check if time is over and the break can start
  break = () => {
    if(this.state.pause === false) {
      if(this.state.breakTime > 9){
    this.setState({
      session: "Break",
      sessionMinutes: this.state.breakTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: true
    })
    this.timer()
  } else {
       this.setState({
         session: "Break",
         sessionMinutes: "0" + this.state.breakTime,
         sessionSeconds: "00",
         timerIsOn: false,
         pause: true,
       });
       this.timer();
  }
  } else {
    if(this.state.sessionTime > 9) {
    this.setState({
      session: "Session",
      sessionMinutes: this.state.sessionTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    this.timer();
  } else {
    this.setState({
      session: "Session",
      sessionMinutes: "0" +this.state.sessionTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    this.timer();
  }
}
  };

  //Reset Time
  resetTime = () => {
    clearInterval(countDown);
    this.setState({
      session: "Session",
      breakTime: 5,
      sessionTime: 25,
      sessionMinutes: 25,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
  };

  render() {
    return (
      <div id="container">
        <div id="clock">
          <div id="title">
            <h3>25 + 5 CLOCK</h3>
          </div>
          <div id="buttons">
            <div id="break-label">
              BREAK LENGTH
              <div id="break">
                <div
                  id="break-decrement"
                  className="material-icons"
                  onClick={() => this.decrementBreakTime()}
                >
                  remove_circle
                </div>
                <div id="break-length">{this.state.breakTime}</div>
                <div
                  id="break-increment"
                  className="material-icons"
                  onClick={() => this.incrementBreakTime()}
                >
                  add_circle
                </div>
              </div>
            </div>
            <div id="session-label">
              SESSION LENGTH
              <div id="session">
                <div
                  id="session-decrement"
                  className="material-icons"
                  onClick={() => this.decrementSession()}
                >
                  remove_circle
                </div>
                <div id="session-length">{this.state.sessionTime}</div>
                <div
                  id="session-increment"
                  className="material-icons"
                  onClick={() => this.incrementSession()}
                >
                  add_circle
                </div>
              </div>
            </div>
          </div>
          <div id="timer-label">
            <h3>{this.state.session}</h3>
            <div id="time-left">
              <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" type="audio/mp3"></audio>
              {this.state.sessionMinutes}:{this.state.sessionSeconds}
            </div>
            <div id="button-timer">
              <div
                id="start_stop"
                className="material-icons"
                onClick={() => this.timer()}
              >
                play_circle_filled
              </div>
              <div
                id="reset"
                className="material-icons"
                onClick={() => this.resetTime()}
              >
                replay
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));