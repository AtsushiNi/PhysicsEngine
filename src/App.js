import React from 'react';
import Space from './Spase'
import Editor from './Editor'
import Controller from './Controller'
import './App.css'
import Box from './models/Box.js'
import BoxConfig from './models/BoxConfig.js'
import Calculation from './services/Calculation.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxes: [
        new Box(1,1,1,0,0,0),
      ],
      boxConfigs: [
        new BoxConfig(1,1,1,0,0,0,0,0,0)
      ],
    }
  }

  shouldComponentUpdate(nextProp, nextState) {
    if (this.state.boxConfigs.length !== nextState.boxConfigs.length) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
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
      boxConfigs: boxConfigs,
    })
  }

  updatePosition = (index, i, value) => {
    var boxes = this.state.boxes.slice()
    var boxConfigs = this.state.boxConfigs.slice()
    boxConfigs[index].initialPosition[i] = value
    boxes[index].position[i] = value
    this.setState({
      boxes: boxes,
      boxConfigs: boxConfigs,
    })
  }

  startAnimation = (event) => {
    this.intervalId = setInterval(this.animate, 20)
  }

  stopAnimation = (event) => {
    clearInterval(this.intervalId)
  }

  animate = () => {
    var boxes = this.state.boxes.slice()
    const boxConfigs = this.state.boxConfigs
    Calculation.updatevalues(boxes, boxConfigs)
    this.setState({
      boxes: boxes
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Editor">
          <Editor
            addBox={this.addBox}
            boxConfigs={this.state.boxConfigs}
            updateLotation={this.updateLotation}
            updatePosition={this.updatePosition} />
        </div>
        <div className="RightBlock">
          <div className="Space">
            <Space boxes={this.state.boxes}/>
          </div>
          <div className="Controller" >
            <Controller
              className="controller"
              handleClickStart={this.startAnimation}
              handleClickStop={this.stopAnimation}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
