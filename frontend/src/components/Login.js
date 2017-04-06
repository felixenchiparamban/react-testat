// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Segment, Button, Input, Form, Grid } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {
      from: string,
    }
  }
}

class Login extends React.Component {
  
  props: Props
  
  state: {
    login: string,
    password: string,
    error?: Error,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error, login, password } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
        
    return (
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column style={{width : 400}}>
          <h1>Bank of Rapperswil</h1>
          <Segment stacked>
            <Form>
              <Form.Field>
                <Input onChange={this.handleLoginChanged} icon='user' iconPosition='left' placeholder='Login' value={login} />
              </Form.Field>
              <Form.Field>
                <Input onChange={this.handlePasswordChanged} icon='user' iconPosition='left' placeholder='Password' type="password" value={password} />
              </Form.Field>
              <Form.Field>
                <Button fluid size='large' color='teal' onClick={this.handleSubmit}>Log-in</Button>
              </Form.Field>
            </Form>
          </Segment>
          { error && <p>Es ist ein Fehler aufgetreten!</p> }
          <Link to="/signup">Noch keinen Account?</Link>
        </Grid.Column>
        </Grid>
    )
  }
}

export default Login
