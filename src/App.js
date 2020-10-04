import React from 'react';
import './App.css';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      date_created: null,
      post_type: true,
      down_vote: null,
      up_vote: null,
      num_votes: null,
      Boast_Roast: [
        "content",
        "date_created",
        "post_type",
        "down_vote",
        "up_vote",
        "num_votes",
      ],
      // changeState: {

      // }
    };
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/BoastRoast/")
      .then((res) => res.json())
      .then((results) => this.setState({ Boast_Roast: results }));
  }
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    })
    console.log(this.state)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.Boast_Roast)
    fetch("http://127.0.0.1:8000/api/BoastRoast/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({content: this.state.content, post_type: this.state.post_type})
    })
      .then((res) => res.json())
      .then((results) => console.log(results));
    
  };
  handleBoasts = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/BoastRoast/boast/")
      .then((res) => res.json())
      .then((results) => this.setState({ Boast_Roast: results }));
  };
  handleRoasts = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/BoastRoast/roast/")
      .then((res) => res.json())
      .then((results) => this.setState({ Boast_Roast: results }));
  };
  handleUpVotes = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://127.0.0.1:8000/api/BoastRoast/" + id + "/up_vote/",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };
  handleDownVotes = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://127.0.0.1:8000/api/BoastRoast/" + id + "/down_vote/",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };
  highestVotes = (e) => {
    fetch("http://127.0.0.1:8000/api/BoastRoast/highest_votes/")
      .then((res) => res.json())
      .then((data) => this.setState({ Boast_Roast: data }));
  };
  render() {
    return (
      <div className="App">
        <h1>GhostPost React App by Cheria Artis</h1>
        <h3>Enter your boast or roast below.</h3>
        <button onClick={this.handleBoasts}>Boasts</button>
        <button onClick={this.handleRoasts}>Roasts</button>
        <button onClick={this.highestVotes}>By Highest Votes</button>
        <form onSubmit={this.handleSubmit}>
          <select>
            <option value="Boast">Boast</option>
            <option value="Roast">Roast</option>
          </select>
          <input type="text" value={this.state.Boast_Roast.content} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.state.Boast_Roast.map((Boast_Roast, id) => (
            <div key={id}>
              <ul>
                <li>Type: {Boast_Roast.post_type ? "Boast" : "Roast"}</li>
                <li>
                  Timestamp:{" "}
                  {moment(Boast_Roast.date_created).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </li>
                <li>Content: {Boast_Roast.content}</li>
                <li>Up Votes: {Boast_Roast.up_vote}</li>
                <li>Down Votes: {Boast_Roast.down_vote}</li>
                <li>Total Votes: {Boast_Roast.num_votes}</li>
                <button onClick={(e) => this.handleUpVotes(Boast_Roast.id)}>
                  Up Vote
                </button>
                <button onClick={(e) => this.handleDownVotes(Boast_Roast.id)}>
                  Down Vote
                </button>
              </ul>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
