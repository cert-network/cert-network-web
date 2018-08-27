import React, { Component } from 'react'
import axios from 'axios'
import CardStyle from '../common/Card'
import Dialog from '../common/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import Web3 from 'web3'

// const web3 = new Web3(window.web3.currentProvider)
let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the Browser and Metamask is running.
  web3 = new Web3(window.web3.currentProvider) // We are using the current provider that Metamask has injected in the web page. The reason is because it accesses Rinkeby
} else {
  // we are on the Server or Metamask is not running.
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/nKwSmXaDTrQo6aNu0Omq'
  )
  web3 = new Web3(provider)
}

class Approver extends Component {
  state = {
    open: false,
    cerList: [],
    currentData: {},
    isLoading: false,
    private: ''
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const accounts = await web3.eth.getAccounts()
    console.log('accounts: ', accounts)
    const { data } = await axios.get(
      `https://cert-network.herokuapp.com/api/cert/approver/${'0x31fa055F4b7B2C50eC625Af0eC0ebcDCCb0aEb9B'}`
      // 'https://cert-network.herokuapp.com/api/cert/category/Blockchain'
    )
    console.log('data: ', data)

    this.setState({
      cerList: [...this.state.cerList, ...data.data],
      isLoading: false
    })
  }

  renderCertList = () => {
    if (this.state.cerList.length > 0) {
      return (
        <div>
          {this.state.cerList.map(item => {
            return (
              <CardStyle
                key={item.certId}
                item={item}
                onClick={this.handleOnClick}
              />
            )
          })}
        </div>
      )
    } else if (this.state.isLoading) {
      return <CircularProgress />
    } else {
      return <p>No data</p>
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = async condition => {
    const accounts = await web3.eth.getAccounts()
    if (condition === 1) {
      console.log('approve')
      try {
        const { data } = await axios.post(
          'https://cert-network.herokuapp.com/api/cert/approve',
          {
            certCreator: this.state.currentData.certCreator,
            certId: this.state.currentData.certId,
            category: this.state.currentData.category,
            private: this.state.private,
            address: '0x31fa055F4b7B2C50eC625Af0eC0ebcDCCb0aEb9B'
          }
        )
        console.log('data: ', data)
        alert('approve success')
        this.setState({ open: false, private: '' })
      } catch (error) {
        this.setState({ open: false, private: '' })
      }
    } else if (condition === 0) {
      console.log('reject')
      try {
        const { data } = await axios.post(
          'https://cert-network.herokuapp.com/api/cert/reject',
          {
            certCreator: this.state.currentData.certCreator,
            certId: this.state.currentData.certId,
            category: this.state.currentData.category,
            private: this.state.private,
            address: '0x31fa055F4b7B2C50eC625Af0eC0ebcDCCb0aEb9B'
          }
        )
        console.log('data: ', data)
        alert('reject success')
        this.setState({ open: false, private: '' })
      } catch (error) {
        this.setState({ open: false, private: '' })
      }
    }
    this.setState({ open: false, private: '' })
    console.log(this.state.currentData)
  }

  handleOnClick = item => {
    this.handleClickOpen()
    this.setState({ currentData: item })
  }

  handleSetPrivate = value => {
    // console.log('value: ', value)
    this.setState({ private: value })
  }

  render() {
    return (
      <div>
        {this.renderCertList()}
        <Dialog
          open={this.state.open}
          handleClose={this.handleClose}
          item={this.state.currentData}
          handleSetPrivate={this.handleSetPrivate}
          private={this.state.private}
        />
      </div>
    )
  }
}

export default Approver
