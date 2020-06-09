import React from 'react'
import Space from './Space'
import Editor from './editor/Editor'
import Controller from './Controller'
import './App.css'
import Box from '../models/Box.js'
import BoxConfig from '../models/BoxConfig.js'
import GeneralConfig from '../models/GeneralConfig.js'
import Calculation from '../services/Calculation.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxes: [new Box()],
      boxConfigs: [new BoxConfig()],
      generalConfig: new GeneralConfig(0, -0.005, 0, 0.005),
    }
    this.visibles = {
      axis: true,
      boxes: true,
      debugObjects: false,
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
    var newBox = new Box()
    var boxes = this.state.boxes.slice()
    var newBoxConfig = new BoxConfig()
    var boxConfigs = this.state.boxConfigs.slice()
    boxes.push(newBox)
    boxConfigs.push(newBoxConfig)
    this.setState({
      boxes: boxes,
      boxConfigs: boxConfigs,
    })
  }

  // updateBox = (index, box) => {
  //   var boxes = Object.assign([], this.state.boxes)
  //   boxes[index] = box
  //   this.setState({
  //     boxes: boxes,
  //   })
  // }

  // updateBoxConfig = (index, boxConfig) => {
  //   var boxConfigs = Object.assign([], this.state.boxConfigs)
  //   boxConfigs[index] = boxConfig
  //   this.setState({
  //     boxConfigs: boxConfigs,
  //   })
  // }

  updateGeneralConfig = generalConfig => {
    this.setState({
      generalConfig: generalConfig,
    })
  }

  startAnimation = (event) => {
    this.intervalId = setInterval(this.animate, 20)
  }

  stopAnimation = event => {
    clearInterval(this.intervalId)
  }

  resetAnimation = event => {
    var boxes = this.state.boxes.slice()
    Calculation.resetValues(boxes, this.state.boxConfigs)
    this.setState({
      boxes: boxes,
    })
  }

  animate = () => {
    var boxes = this.state.boxes.slice()
    const { boxConfigs, generalConfig } = this.state
    Calculation.updateValues(boxes, boxConfigs, generalConfig.gravity)
    this.setState({
      boxes: boxes,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Editor">
          <Editor
            boxes={this.state.boxes}
            boxConfigs={this.state.boxConfigs}
            generalConfig={this.state.generalConfig}
            addBox={this.addBox}
            updateBox={this.updateBox}
            updateBoxConfig={this.updateBoxConfig}
            updateGeneralConfig={this.updateGeneralConfig}
          />
        </div>
        <div className="RightBlock">
          <div className="Space">
            <Space boxes={this.state.boxes} visibles={this.visibles} />
          </div>
          <div className="Controller">
            <Controller
              className="controller"
              handleClickStart={this.startAnimation}
              handleClickStop={this.stopAnimation}
              handleClickReset={this.resetAnimation}
              visibles={this.visibles}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
