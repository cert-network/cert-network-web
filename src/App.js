import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import Admin from './features/Admin'
// import User from './features/User'
import Approver from './features/Approver'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#fa8072', contrastText: '#ffffff' }
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: '#ffffff'
      }
    },
    MuiFormLabel: {
      focused: {
        '&$focused': {
          color: '#fa8072'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before': {
          borderBottom: '2px solid #000000 !important'
        },
        '&:after': {
          borderBottom: '2px solid #fa8072 !important'
        }
      }
    }
  }
})

class App extends Component {
  state = {
    value:
      this.props.location.pathname === '/'
        ? '/admin'
        : this.props.location.pathname
  }

  handleChange = (event, value) => {
    this.setState({ value })
    this.props.history.push(value)
  }
  render() {
    const { value } = this.state
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                style={{ flexGrow: 1 }}
              >
                CertNetwork
              </Typography>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab
                  label="Admin"
                  value="/admin"
                  component={Link}
                  to="/admin"
                />
                {/* <Tab label="User" value="/user" component={Link} to="/user" /> */}
                <Tab
                  label="Approver"
                  value="/approver"
                  component={Link}
                  to="/approver"
                />
              </Tabs>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/admin" component={Admin} />
            {/* <Route path="/user" component={User} /> */}
            <Route path="/approver" component={Approver} />
            <Route path="/" render={() => <Redirect to="/admin" />} />
          </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(App)
