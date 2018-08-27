import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    minWidth: 200,
    // padding: '0 30px',
    margin: '1rem',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  label: {
    textTransform: 'capitalize'
  }
}

const ButtonStyle = props => {
  const { classes, onClick, disabled } = props
  return (
    <Button
      disabled={disabled}
      classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
      }}
      onClick={onClick}
    >
      {props.children}
    </Button>
  )
}

export default withStyles(styles)(ButtonStyle)
