import React from 'react';
import Space from './Spase'
import Editor from './Editor'
import './App.css'
import Box from './models/Box.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxes: [
        new Box(1,1,1,0,0,0),
      ]
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      var boxes = this.state.boxes
      boxes[0].position[0] += 0.03
      this.setState({
        boxes: boxes
      })
    }, 20)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  shouldComponentUpdate(nextProp, nextState) {
    const nextBoxes = nextState.boxes
    const prevBoxes = this.state.boxes

    if (prevBoxes.length !== nextBoxes.length) {
      return true
    }

    return false
  }

  addBox = () => {
    var newBox = new Box(0, 1, 1, 0, 0, 0)
    var boxes = this.state.boxes.slice()
    boxes.push(newBox)
    this.setState({
      boxes: boxes
    })
  }

  updateLotation = (index, i, value) => {
    var boxes = this.state.boxes
    boxes[index].initialLotation[i] = value
    this.setState({
      boxes: boxes
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Editor">
          <Editor addBox={this.addBox} boxes={this.state.boxes} updateLotation={this.updateLotation}/>
        </div>
        <div className="Space">
          <Space boxes={this.state.boxes}/>
        </div>
      </div>
    );
  }
}

export default App;
