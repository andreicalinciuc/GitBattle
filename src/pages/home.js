import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    console.log("render din comonentDidMount home");

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  componentWillUnmount(){
      console.log('am iesit')
      clearInterval(this.timerID);
  }



  render() {
    return (
      <div>
        <p>Acesta este un exercitiu de test pe home page</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default Home;
