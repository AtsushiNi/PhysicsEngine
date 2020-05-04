import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { makeStyles, createStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export default function Editor(props) {
  const useStyles = makeStyles(theme => createStyles({
    button: {
      color: 'white',
      borderColor: 'white',
      margin: 10
    },
    tab: {
      backgroundColor: '#222',
      margin: 5
    },
    input: {
      width: 42
    }
  }))

  const classes = useStyles()

  const [value, setValue] = useState(0)

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeSlider = (id, i) => (event, newValue) => {
    props.updateLotation(id, i, newValue)
  }

  const handleChangeInput = (id, i) => (event) => {
    const newValue = event.target.value
    if (isFinite(newValue) && newValue != '' )
    props.updateLotation(id, i, Number(newValue))
  }

  const TabPanel = (props) => {
    const { box, value, index } = props
    const initialLotation = box.initialLotation

    return (
      <div
        hidden={value !== index}
      >
        <Box p={3}>
          Lotation
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item xs>
                  <Slider name={String(i)} aria-labelledby="aaaaa" value={initialLotation[i]} onChange={handleChangeSlider(index, i)}/>
                </Grid>
                <Grid item>
                  <Input className={classes.input} value={initialLotation[i]} handleChange={handleChangeInput(index, i)}/>
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
      <Button variant="outlined" className={classes.button} onClick={props.addBox} >
        new Box
      </Button>
      <ThemeProvider theme={theme} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs"
          className={classes.tab}
        >
          {props.boxes.map((_, i) => <Tab label={`box ${i}`} />)}
        </Tabs>
        {props.boxes.map((box, i) => <TabPanel box={box} value={value} index={i} />)}
      </ThemeProvider>
    </div>
  )
}
