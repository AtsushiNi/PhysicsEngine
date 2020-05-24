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
import Quaternion from '../../services/quaternion'

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
      initialRotVelocity: props.boxConfig.initialRotVelocity.map(
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

    const quaternion = Quaternion.fromEuler([
      (newRotation[0] * Math.PI) / 180,
      (newRotation[1] * Math.PI) / 180,
      (newRotation[2] * Math.PI) / 180,
    ])
    this.props.box.rotation[i] = (newValue * Math.PI) / 180.0
    this.props.box.quaternion = quaternion
  }

  handleBoxRotationSliderCommit = i => (event, newValue) => {
    this.props.boxConfig.initialRotation[i] = (newValue * Math.PI) / 180.0
  }

  handleBoxRotationInputChange = i => event => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      this.props.box.rotation[i] = Number((newValue * Math.PI) / 180.0)
      this.props.boxConfig.initialRotation[i] = Number(
        (newValue * Math.PI) / 180.0
      )
    }
  }

  handleBoxPositionSliderChange = i => (event, newValue) => {
    const newPosition = this.state.initialPosition.slice()
    newPosition[i] = newValue
    this.setState({ initialPosition: newPosition })

    this.props.box.position[i] = newValue
  }

  handleBoxPositionSliderCommit = i => (event, newValue) => {
    this.props.boxConfig.initialPosition[i] = newValue
  }

  handleBoxPositionInputChange = i => event => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      this.props.box.position[i] = Number(newValue)
      this.props.boxConfig.initialPosition[i] = Number(newValue)
    }
  }

  handleBoxVelocityInputChange = i => event => {
    const newValue = event.target.value

    if (this.NumberRegExpPattern.test(newValue)) {
      const initialVelocity =
        Number(newValue) * this.props.boxConfig.standardVelocity
      this.props.box.velocity[i] = initialVelocity
      this.props.boxConfig.initialVelocity[i] = initialVelocity

      const initialVelocityState = Object.assign([], this.state.initialVelocity)
      initialVelocityState[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.velocity[i] = false
      this.setState({ initialVelocity: initialVelocityState, error: error })
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
      this.props.boxConfig.initialRotVelocity[i] =
        Number(newValue) * this.props.boxConfig.standardRotVelocity
      const quaternion = Quaternion.fromEuler(this.props.boxConfig.initialRotVelocity)
      this.props.box.quatValocity = quaternion

      const initialRotVelocity = Object.assign(
        [],
        this.state.initialRotVelocity
      )
      initialRotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.rotVelocity[i] = false
      this.setState({ initialRotVelocity: initialRotVelocity, error: error })
    } else {
      const initialRotVelocity = Object.assign(
        [],
        this.state.initialRotVelocity
      )
      initialRotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.rotVelocity[i] = true
      this.setState({ initialRotVelocity: initialRotVelocity, error: error })
    }
  }

  handleFixCheck = event => {
    const newValue = event.target.checked

    this.setState({ fixed: newValue })

    this.props.boxConfig.fixed = newValue
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
                    value={this.state.initialRotVelocity[i]}
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
