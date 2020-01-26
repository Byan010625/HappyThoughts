import React, { Component } from 'react'
import './audio.css'
import  CheckBox  from './CheckBox'
import TextField from '@material-ui/core/TextField'
import '../node_modules/react-linechart/dist/styles.css';
import LineChart from 'react-linechart';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      emotions: [
        {id: 1, value: "Very Happy!", isChecked: false},
        {id: 2, value: "Happy!", isChecked: false},
        {id: 3, value: "Neutral", isChecked: false},
        {id: 4, value: "Sad", isChecked: false}, 
        {id: 5, value: "Very Sad :(", isChecked: false}
      ],
      textInput: "",
      data: [{
        color: "steelblue",
        points: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 1},
                {x: 5, y: 4}, {x: 6, y: 3}, {x: 7, y: 2}]
        }]
    }
  }

  handleText = (event) => {
    this.setState({
      textInput: event.target.value
    })
  }

  handleCheckChieldElement = (event) => {
    let emotions = this.state.emotions
    emotions.forEach(fruite => {
       if (fruite.value === event.target.value)
          if (fruite.isChecked === false) {
            emotions.forEach(fruite1 => {
              fruite1.isChecked = false
            })

            fruite.isChecked = true
          }
          // emotions.forEach(fruite1 => {
          //   fruite1.isChecked = false
          // }) 
          // fruite.value.isChecked = true
    })
    this.setState({emotions: emotions})
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.textInput);
    this.setState({
      textInput: ""
    })
    var addEmotion = "";
    let emotions = this.state.emotions
    emotions.forEach(fruite =>  {
      if (fruite.isChecked === true) {
        addEmotion = 6-fruite.id;
      }
    })
    axios.post('http://localhost:8080/api/gratitude', {body: this.state.textInput, user: "Anonymous", date: (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate()})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({
      data: [{
        color: 'steelblue',
        points: this.state.data[0].points.concat({x: this.state.data[0].points.length+1, y: addEmotion})
      }]
    })
    console.log(addEmotion);
  }
  render() {
    console.log('points', this.state.data[0].points)
    const data = [
      { color: 'steelblue',
        points: this.state.data[0].points
      }
    ]
    return (
      <div className="App">
      <h1> How Are You Feeling Today? </h1>
        <ul>
        {
          this.state.emotions.map((fruite, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
          })
        }
        </ul>
        <form className = "form-horizontal">
          <h1>
            What Are You Grateful For?
          </h1>
          <p> Enter here:</p>
          <TextField label="E.g. Family" onChange={this.handleText} placeholder="Type here" value={this.state.textInput} />
        </form>
        <button type="button" onClick={this.onSubmit} className = "btn">Submit</button>
        <h1>
        Your Happpiness Level Over the Last Week
        </h1>
        <LineChart
            width = {600}
            height = {400}
            data = {data}
            xLabel = {"Days"}
            yLabel = {"Happiness Level"}
            yMin = {1}
            yMax = {5}
            ticks = {7}
        />
      </div>
    );
  }
}
export default App
/*
<input
            type="text"
            className = "form-control"
            ref = {(c) => this.title = c}
            name = "title"
          />
*/