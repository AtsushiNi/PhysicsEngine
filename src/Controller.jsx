import React from 'react'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { blue } from '@material-ui/core/colors'

export default function Controller(props) {
  const useStyles = makeStyles(theme => createStyles({
    container: {
      height: '10%'
    },
    button: {
      backgroundColor: blue[500]
    }
  }))

  const classes = useStyles()

  return (
    <Grid container spacing={3} alignItems="center" className={classes.container}>
      <Grid item>
        <Button
          endIcon={<PlayArrowRoundedIcon />}
          className={classes.button}
          onClick={props.handleClickStart}
        >
          Play
        </Button>
      </Grid>
      <Grid item>
        <Button
          endIcon={<StopRoundedIcon />}
          className={classes.button}
          onClick={props.handleClickStop}
        >
          Stop
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          onClick={props.handleClickReset}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  )
}
