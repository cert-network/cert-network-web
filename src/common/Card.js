import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import ImageCert from '../assets/Cert_network.svg'

const CardButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const styles = {
  container: {
    display: 'flex'
  },
  card: {
    minWidth: 275,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: '2rem'
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    color: 'white'
  },
  category: {
    marginBottom: 12,
    fontSize: 24,
    color: 'lightyellow'
  },
  cover: {
    width: 151,
    height: 'auto',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5rem 0'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1
  },
  icon: {
    margin: '1rem',
    cursor: 'pointer',
    color: 'white'
  }
}

function SimpleCard(props) {
  const { classes, item, onClick } = props

  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <CardMedia
          className={classes.cover}
          image={ImageCert}
          title="Live from space album cover"
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title}>{item.name}</Typography>
          <Typography className={classes.category} color="textSecondary">
            {item.category}
          </Typography>
        </CardContent>
        <CardButton onClick={() => onClick(item)}>
          <Icon className={classes.icon} style={{ fontSize: 36 }}>
            arrow_forward_ios
          </Icon>
        </CardButton>
      </div>
    </Card>
  )
}

export default withStyles(styles)(SimpleCard)
