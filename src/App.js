import React from 'react';
import Space from './Spase'
import Editor from './Editor'
import './App.css'
import Box from './models/Box.js'
import BoxConfig from './models/BoxConfig.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxes: [
        new Box(1,1,1,0,0,0),
      ],
      boxConfigs: [
        new BoxConfig(1,1,1,0,0,0,0,0,0)
      ]
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      var boxes = this.state.boxes.slice()
      boxes[0].lotation[0] += 0.03
      this.setState({
        boxes: boxes
      })
    }, 20)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  shouldComponentUpdate(nextProp, nextState) {
    const nextBoxConfigs = nextState.boxConfigs
    const prevBoxConfigs = this.state.boxConfigs

    if (prevBoxConfigs !== nextBoxConfigs) {
      return true
    }

    return false
  }

  addBox = () => {
    var newBox = new Box(0, 1, 1, 0, 0, 0)
    var boxes = this.state.boxes.slice()
    var newBoxConfig = new BoxConfig(1, 1, 1, 0, 1, 1, 0, 0, 0)
    var boxConfigs = this.state.boxConfigs.slice()
    boxes.push(newBox)
    boxConfigs.push(newBoxConfig)
    this.setState({
      boxes: boxes,
      boxConfigs: boxConfigs,
    })
  }

  updateLotation = (index, i, value) => {
    var boxes = this.state.boxes.slice()
    var boxConfigs = this.state.boxConfigs.slice()
    boxConfigs[index].initialLotation[i] = value
    boxes[index].lotation[i] = value
    this.setState({
      boxes: boxes,
      boxConfigs: boxConfigs
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Editor">
          <Editor addBox={this.addBox} boxConfigs={this.state.boxConfigs} updateLotation={this.updateLotation}/>
        </div>
        <div className="Space">
          <Space boxes={this.state.boxes}/>
        </div>
      </div>
    );
  }
}

export default App;
