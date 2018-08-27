import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'

const AdminContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 2rem 0;
`

const ListContainer = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`

const FormContainer = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: '16px 0',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class Admin extends Component {
  state = {
    category: '',
    categoryList: [],
    isLoading: false,
    nameForm: '',
    addressForm: '',
    privateForm: '',
    categoryForm: ''
  }

  async componentDidMount() {
    const { data } = await axios.get(
      'https://cert-network.herokuapp.com/api/category'
    )
    this.setState({ categoryList: data.data })
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value
    })
  }

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addCategory = async () => {
    try {
      if (!this.state.isLoading && this.state.category !== '') {
        this.setState({ isLoading: true })
        const { data } = await axios.post(
          'https://cert-network.herokuapp.com/api/category',
          { name: this.state.category }
        )
        this.setState({
          category: '',
          categoryList: [
            ...this.state.categoryList,
            { name: this.state.category }
          ],
          isLoading: false
        })
        alert(data.message)
      }
    } catch (error) {
      this.setState({ isLoading: false })
      alert(error)
    }
  }

  handleAdd = () => {
    this.addCategory()
  }

  handleEnter = key => {
    if (key === 'Enter') {
      this.addCategory()
    }
    return
  }

  handleApproverSubmit = async () => {
    try {
      this.setState({ isLoading: true })
      const { nameForm, addressForm, privateForm, categoryForm } = this.state
      const form = {
        name: nameForm,
        address: addressForm,
        // private: privateForm,
        category: categoryForm
      }
      const { data } = await axios.post(
        'https://cert-network.herokuapp.com/api/approver',
        form
      )
      alert(data.message)
    } catch (error) {
      this.setState({ isLoading: false })
      alert(error)
    }
  }

  renderList = () => {
    if (this.state.categoryList.length > 0) {
      return (
        <List component="nav">
          {this.state.categoryList.map((item, i) => {
            return (
              <ListItem
                key={i}
                divider={
                  this.state.categoryList.length - 1 === i ? false : true
                }
                button
              >
                <ListItemText primary={item.name} />
              </ListItem>
            )
          })}
        </List>
      )
    } else {
      return <CircularProgress />
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <AdminContainer>
          <ListContainer>
            <Typography variant="title" color="primary">
              Categories
            </Typography>
            <List component="nav">{this.renderList()}</List>
          </ListContainer>
          <FormContainer>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                id="category"
                label="Category"
                value={this.state.category}
                onChange={this.handleChange('category')}
                onKeyPress={e => this.handleEnter(e.key)}
                margin="normal"
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAdd}
              disabled={this.state.isLoading}
            >
              Add Category +
            </Button>
          </FormContainer>
        </AdminContainer>
        <div>
          <Typography
            variant="title"
            color="primary"
            style={{ textAlign: 'center' }}
          >
            Create Approver
          </Typography>
          <FormContainer>
            {/* name, address, private, category */}
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                id="name"
                label="Name"
                value={this.state.nameForm}
                onChange={this.handleChange('nameForm')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="address"
                label="Address"
                value={this.state.addressForm}
                onChange={this.handleChange('addressForm')}
                margin="normal"
                fullWidth
              />
              {/* <TextField
                id="private"
                label="Private Key"
                value={this.state.privateForm}
                onChange={this.handleChange('privateForm')}
                margin="normal"
                fullWidth
              /> */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="categoryForm">Category</InputLabel>
                <Select
                  value={this.state.categoryForm}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'categoryForm',
                    id: 'categoryForm'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.categoryList.map(item => {
                    return (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleApproverSubmit}
              disabled={this.state.isLoading}
            >
              Add Approver +
            </Button>
          </FormContainer>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Admin)
