import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { makeStyles, createStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import './Editor.css'

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
    }
  }))

  const classes = useStyles()

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  })

  const TabPanel = (props) => {
    const { children, value, index } = props
    return (
      <div
        hidden={value !== index}
      >
        <Box p={3}>
          {children}
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
          {props.boxes.map(() => <Tab label="box" />)}
        </Tabs>
        <TabPanel>
          tab panel
        </TabPanel>
      <Slider disabled defaultValue={30} />
      </ThemeProvider>
    </div>
  )
}
