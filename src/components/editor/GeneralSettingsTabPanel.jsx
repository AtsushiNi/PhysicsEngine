import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import GeneralConfig from '../../models/GeneralConfig'

export default class GeneralSettingsTabPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gravity: this.props.generalConfig.gravity.map((g) => g / this.props.generalConfig.standardGravity)
    }
  }

  handleGravitySliderChange = (i) => (event, newValue)=> {
    const newGravity = Object.assign([], this.state.gravity)
    newGravity[i] = newValue
    this.setState({ gravity: newGravity })
  }

  handleGravitySliderCommit = (i) => (event, newValue) => {
    const generalConfig = Object.assign({}, this.props.generalConfig)
    generalConfig.gravity[i] = generalConfig.standardGravity * newValue
    this.props.updateGeneralConfig(generalConfig)
  }

  handleGravityInputChange = (i) => (event) => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      const generalConfig = Object.assign({}, this.props.generalConfig)
      generalConfig.gravity[i] = generalConfig.standardGravity * Number(newValue)
      this.props.updateGeneralConfig(generalConfig)
    }
  }

  render() {
    const { showTabIndex, index } = this.props

    if (showTabIndex !== index) { return <div hidden={true} ></div> }

    return (
      <div style={{backgroundColor: '#444', marginRight: 5, marginLeft: 5, border: 'solid', borderWidth: 2, borderColor: '#222'}}>
        <Box p={3}>
          Gravity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center" key={i}>
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    max={3}
                    min={-3}
                    step={0.1}
                    value={this.state.gravity[i]}
                    onChange={this.handleGravitySliderChange(i)}
                    onChangeCommitted={this.handleGravitySliderCommit(i)} />
                </Grid>
                <Grid item>
                  <Input
                    value={this.state.gravity[i]}
                    onChange={this.handleGravityInputChange(i)} />
                </Grid>
              </Grid>
            )
          })}
        </Box>
      </div>
    )
  }
}

GeneralSettingsTabPanel.propTypes = {
  generalConfig: PropTypes.instanceOf(GeneralConfig),
  showTabIndex: PropTypes.number,
  index: PropTypes.number,
  updateGeneralConfig: PropTypes.func
}
