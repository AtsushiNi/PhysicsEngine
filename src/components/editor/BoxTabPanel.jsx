import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import CheckBox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { default as BoxInfo } from '../../models/Box'
import { default as BoxConfigInfo } from '../../models/BoxConfig'

class BoxTabPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRotation: props.boxConfig.initialRotation.map(
        l => (l * 180) / Math.PI
      ),
      initialPosition: props.boxConfig.initialPosition.slice(),
      initialVelocity: props.boxConfig.initialVelocity.map(
        v => v / props.boxConfig.standardVelocity
      ),
      rotVelocity: props.boxConfig.initialRotVelocity.map(
        lv => lv / props.boxConfig.standardRotVelocity
      ),
      fixed: props.boxConfig.fixed,
      size: props.boxConfig.size,
      error: {
        velocity: [false, false, false],
        rotVelocity: [false, false, false],
        size: [false, false, false],
      },
    }
  }

  NumberRegExpPattern = /^-?[0-9]+(.[0-9]+)?$/

  handleBoxRotationSliderChange = i => (event, newValue) => {
    const newRotation = this.state.initialRotation.slice()
    newRotation[i] = newValue
    this.setState({ initialRotation: newRotation })

    const box = Object.assign({}, this.props.box)
    box.rotation[i] = (newValue * Math.PI) / 180.0
    this.props.updateBox(this.props.index, box)
  }

  handleBoxRotationSliderCommit = i => (event, newValue) => {
    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.initialRotation[i] = (newValue * Math.PI) / 180.0
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  handleBoxRotationInputChange = i => event => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.rotation[i] = Number((newValue * Math.PI) / 180.0)
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialRotation[i] = Number((newValue * Math.PI) / 180.0)
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)
    }
  }

  handleBoxPositionSliderChange = i => (event, newValue) => {
    const newPosition = this.state.initialPosition.slice()
    newPosition[i] = newValue
    this.setState({ initialPosition: newPosition })

    const box = Object.assign({}, this.props.box)
    box.position[i] = newValue
    this.props.updateBox(this.props.index, box)
  }

  handleBoxPositionSliderCommit = i => (event, newValue) => {
    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.initialPosition[i] = newValue
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  handleBoxPositionInputChange = i => event => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.position[i] = Number(newValue)
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialPosition[i] = Number(newValue)
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)
    }
  }

  handleBoxVelocityInputChange = i => event => {
    const newValue = event.target.value

    if (this.NumberRegExpPattern.test(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.velocity[i] = Number(newValue) * this.props.boxConfig.standardVelocity
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialVelocity[i] =
        Number(newValue) * this.props.boxConfig.standardVelocity
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)

      const initialVelocity = Object.assign([], this.state.initialVelocity)
      initialVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.velocity[i] = false
      this.setState({ initialVelocity: initialVelocity, error: error })
    } else {
      const initialVelocity = Object.assign([], this.state.initialVelocity)
      initialVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.velocity[i] = true
      this.setState({ initialVelocity: initialVelocity, error: error })
    }
  }

  handleBoxRotVelocityInputChange = i => event => {
    const newValue = event.target.value

    if (this.NumberRegExpPattern.test(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.rotVelocity[i] =
        Number(newValue) * this.props.boxConfig.standardRotVelocity
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialRotVelocity[i] =
        Number(newValue) * this.props.boxConfig.standardRotVelocity
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)

      const rotVelocity = Object.assign([], this.state.rotVelocity)
      rotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.rotVelocity[i] = false
      this.setState({ rotVelocity: rotVelocity, error: error })
    } else {
      const rotVelocity = Object.assign([], this.state.rotVelocity)
      rotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.rotVelocity[i] = true
      this.setState({ rotVelocity: rotVelocity, error: error })
    }
  }

  handleFixCheck = event => {
    const newValue = event.target.checked

    this.setState({ fixed: newValue })

    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.fixed = newValue
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  render() {
    const { showTabIndex, index } = this.props

    if (showTabIndex !== index) {
      return <div hidden={true}></div>
    }

    return (
      <div
        style={{
          backgroundColor: '#444',
          marginRight: 5,
          marginLeft: 5,
          border: 'solid',
          borderWidth: 2,
          borderColor: '#222',
        }}
      >
        <Box p={3}>
          Rotation
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    min={0}
                    max={90}
                    value={this.state.initialRotation[i]}
                    onChangeCommitted={this.handleBoxRotationSliderCommit(i)}
                    onChange={this.handleBoxRotationSliderChange(i)}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value={this.state.initialRotation[i]}
                    onChange={this.handleBoxRotationInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Position
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    min={-3.0}
                    max={3.0}
                    step={0.1}
                    value={this.state.initialPosition[i]}
                    onChangeCommitted={this.handleBoxPositionSliderCommit(i)}
                    onChange={this.handleBoxPositionSliderChange(i)}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value={this.state.initialPosition[i]}
                    onChange={this.handleBoxPositionInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Velocity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs>
                  <TextField
                    error={this.state.error.velocity[i]}
                    helperText={
                      this.state.error.velocity[i] ? 'only number' : ''
                    }
                    value={this.state.initialVelocity[i]}
                    onChange={this.handleBoxVelocityInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Angular Velocity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs>
                  <TextField
                    error={this.state.error.rotVelocity[i]}
                    helperText={
                      this.state.error.rotVelocity[i] ? 'only number' : ''
                    }
                    value={this.state.rotVelocity[i]}
                    onChange={this.handleBoxRotVelocityInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Size
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item>{label}</Grid>
                <Grid item>
                  <TextField
                    error={this.state.error.size[i]}
                    helperText={this.state.error.size[i] ? 'only number' : ''}
                    label="read only"
                    InputProps={{ readOnly: true }}
                    value={this.state.size[i]}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <CheckBox
                color="primary"
                checked={this.state.fixed}
                onChange={this.handleFixCheck}
              />
            </Grid>
            <Grid item xs>
              fix this Object
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }
}

export default BoxTabPanel

BoxTabPanel.propTypes = {
  box: PropTypes.instanceOf(BoxInfo),
  boxConfig: PropTypes.instanceOf(BoxConfigInfo),
  index: PropTypes.number,
  showTabIndex: PropTypes.number,
  updateBox: PropTypes.func,
  updateBoxConfig: PropTypes.func,
}
