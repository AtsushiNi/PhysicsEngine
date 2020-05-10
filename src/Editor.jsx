import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import CheckBox from '@material-ui/core/Checkbox'
import { makeStyles, createStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export default function Editor(props) {
  const {
    boxes,
    boxConfigs,
    generalConfig,
    addBox,
    updateBox,
    updateBoxConfig,
    updateGeneralConfig,
  } = props

  const [tabIndex, setTabIndex] = useState(0)

  const useStyles = makeStyles(theme => createStyles({
    button: {
      margin: 10,
    },
    tab: {
      backgroundColor: '#222',
      margin: 5,
      marginBottom: 0,
    },
    input: {
      width: 42
    }
  }))

  const classes = useStyles()

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  })

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex)
  }

  const TabPanel = (props) => {
    const { box, boxConfig, showTabIndex, index } = props

    const [lotationX, setLotationX] =
      useState(boxConfig.initialLotation[0] * 180 / Math.PI)
    const [lotationY, setLotationY] =
      useState(boxConfig.initialLotation[1] * 180 / Math.PI)
    const [lotationZ, setLotationZ] =
      useState(boxConfig.initialLotation[2] * 180 / Math.PI)
    const lotations = [lotationX, lotationY, lotationZ]

    const [positionX, setPositionX] = useState(boxConfig.initialPosition[0])
    const [positionY, setPositionY] = useState(boxConfig.initialPosition[1])
    const [positionZ, setPositionZ] = useState(boxConfig.initialPosition[2])
    const positions = [positionX, positionY, positionZ]

    const [fixed, setFixed] = useState(boxConfig.fixed)

    const handleBoxLotationSliderChange = (i) => (event, newValue) => {
      switch (i) {
        case 0:
          setLotationX(newValue)
          break
        case 1:
          setLotationY(newValue)
          break
        case 2:
          setLotationZ(newValue)
          break
        default:
      }

      box.lotation[i] = Number(newValue * Math.PI / 180.0)
      updateBox(index, box)
    }

    const handleBoxLotationSlicerChangeCommit = (i) => (event, newValue) => {
      boxConfig.initialLotation[i] = Number(newValue * Math.PI / 180.0)
      updateBoxConfig(index, boxConfig)
    }

    const handleBoxLotationInputChange = (i) => (event) => {
      const newValue = event.target.value
      if (isFinite(newValue)) {
        box.lotation[i] = Number(newValue * Math.PI / 180.0)
        boxConfig.initialLotation[i] = Number(newValue * Math.PI / 180.0)
        updateBox(index, box)
        updateBoxConfig(index, boxConfig)
      }
    }

    const handleBoxPositionSliderChange = (i) => (event, newValue) => {
      switch (i) {
        case 0:
          setPositionX(newValue)
          break
        case 1:
          setPositionY(newValue)
          break
        case 2:
          setPositionZ(newValue)
          break
        default:
      }

      box.position[i] = newValue
      updateBox(index, box)
    }

    const handleBoxPositionSliderChangeCommit = (i) => (event, newValue) => {
      boxConfig.initialPosition[i] = newValue
      updateBoxConfig(index, boxConfig)
    }

    const handleBoxPositionInputChange = (i) => (event) => {
      const newValue = event.target.value
      if (isFinite(newValue)) {
        box.position[i] = Number(newValue)
        boxConfig.initialPosition[i] = Number(newValue)
        updateBox(index, box)
        updateBoxConfig(index, boxConfig)
      }
    }

    const handleFixCheck = (event) => {
      setFixed(!fixed)

      boxConfig.fixed = !boxConfig.fixed
      updateBoxConfig(index, boxConfig)
    }

    if (showTabIndex !== index) { return <div hidden={true} ></div>}

    return (
      <div style={{backgroundColor: '#444', marginRight: 5, marginLeft: 5, border: 'solid', borderWidth: 2, borderColor: '#222'}}>
        <Box p={3}>
          Lotation
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item xs>
                  <Slider
                    min={0}
                    max={90}
                    value={lotations[i]}
                    onChangeCommitted={handleBoxLotationSlicerChangeCommit(i)}
                    onChange={handleBoxLotationSliderChange(i)}/>
                </Grid>
                <Grid item>
                  <Input
                    className={classes.input}
                    value={lotations[i]}
                    onChange={handleBoxLotationInputChange(i)}/>
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Position
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item xs>
                  <Slider
                    min={-3.0}
                    max={3.0}
                    step={0.1}
                    value={positions[i]}
                    onChangeCommitted={handleBoxPositionSliderChangeCommit(i)}
                    onChange={handleBoxPositionSliderChange(i)}/>
                </Grid>
                <Grid item>
                  <Input
                    className={classes.input}
                    value={positions[i]}
                    onChange={handleBoxPositionInputChange(i)}/>
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <CheckBox color="primary" checked={fixed} onChange={handleFixCheck} />
            </Grid>
            <Grid item xs>
              fix this Object
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }

  const GeneralSettingsTabPanel = (props) => {
    const { showTabIndex, index } = props

    const [gravityX, setGravityX] = useState(generalConfig.gravity[0] / generalConfig.standardGravity)
    const [gravityY, setGravityY] = useState(generalConfig.gravity[1] / generalConfig.standardGravity)
    const [gravityZ, setGravityZ] = useState(generalConfig.gravity[2] / generalConfig.standardGravity)
    const gravity = [gravityX, gravityY, gravityZ]

    const handleGravitySliderChange = (i) => (event, newValue) => {
      switch(i) {
        case 0:
          setGravityX(newValue)
          break
        case 1:
          setGravityY(newValue)
          break
        case 2:
          setGravityZ(newValue)
          break
        default:
      }
    }

    const handleGravitySliderCommit = (i) => (event, newValue) => {
      var gravity = generalConfig.gravity
      gravity[i] = generalConfig.standardGravity * newValue

      updateGeneralConfig({
        ...generalConfig,
        gravity: gravity
      })
    }

    const handleGravityInputChange = (i) => (event) => {
      const newValue = event.target.value
      var gravity = generalConfig.gravity
      gravity[i] = generalConfig.standardGravity * newValue

      updateGeneralConfig({
        ...generalConfig,
        gravity: gravity
      })
    }

    if (showTabIndex !== index) { return <div hidden={true} ></div> }

    return (
      <div style={{backgroundColor: '#444', marginRight: 5, marginLeft: 5, border: 'solid', borderWidth: 2, borderColor: '#222'}}>
        <Box p={3}>
          Gravity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item xs>
                  <Slider
                    max={3}
                    min={-3}
                    step={0.1}
                    value={gravity[i]}
                    onChange={handleGravitySliderChange(i)}
                    onChangeCommitted={handleGravitySliderCommit(i)} />
                </Grid>
                <Grid item>
                  <Input
                    className={classes.input}
                    value={gravity[i]}
                    onChange={handleGravityInputChange(i)} />
                </Grid>
              </Grid>
            )
          })}
        </Box>
      </div>
    )
  }

  return(
    <div>
      <ThemeProvider theme={theme} >
        <Button variant="outlined" color="primary" className={classes.button} onClick={addBox} >
          new Box
        </Button>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs"
          className={classes.tab}
        >
          {boxConfigs.map((_, i) => <Tab label={`box ${i}`} />)}
          <Tab label='Genaral' />
        </Tabs>
        {boxConfigs.map((boxConfig, i) => (
          <TabPanel box={boxes[i]} boxConfig={boxConfig} showTabIndex={tabIndex} index={i} />
        ))}
        <GeneralSettingsTabPanel showTabIndex={tabIndex} index={boxConfigs.length}/>
      </ThemeProvider>
    </div>
  )
}
