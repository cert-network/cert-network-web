import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'
import ButtonStyle from './Button'
import TextField from '@material-ui/core/TextField'

const ButtonContainer = styled.div`
  text-align: center;
`

const ContentContainer = styled.div`
  text-align: center;
`

const ImageCert = styled.img`
  border-radius: 50%;
  width: 200px;
`

class AlertDialog extends React.Component {
  render() {
    const { item } = this.props
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.handleClose(3)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ textAlign: 'center' }}
            id="alert-dialog-title"
          >{`${item.certCreatorName}`}</DialogTitle>
          <DialogContent>
            <ContentContainer>
              <ImageCert src="http://ko-te.com/i/posts/2104/32734.jpg" alt="" />
              <p>{item.category}</p>
              <p>{item.desc}</p>
              <p>issueDate: {item.issueDate}</p>
              <p>expiredDate: {item.expiredDate}</p>
              <p>Approveed by: {item.approveBy}</p>

              <TextField
                id="private"
                label="PrivateKey"
                value={this.props.private}
                onChange={e => this.props.handleSetPrivate(e.target.value)}
                margin="normal"
              />
            </ContentContainer>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <ButtonContainer>
              <ButtonStyle
                onClick={() => this.props.handleClose(1)}
                disabled={this.props.private === '' ? true : false}
              >
                Approve
              </ButtonStyle>
              <ButtonStyle
                onClick={() => this.props.handleClose(0)}
                disabled={this.props.private === '' ? true : false}
              >
                Reject
              </ButtonStyle>
            </ButtonContainer>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AlertDialog
