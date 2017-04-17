// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

import { Segment, Form, Button, Input, Grid } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {
    
  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: string,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }
  
  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }
  
  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;

    signup(login, firstname, lastname, password).then(result => {
      console.log("Signup result ", result);
      this.setState({redirectToReferrer: true, error: null})
    }).catch(error => this.setState({error}))
  };

  render() {    
    const { redirectToReferrer, error } = this.state;
    
    if (redirectToReferrer) {
      return (
        <Redirect to='/login'/>
      )
    }
    
    return (
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column style={{width:400}}>
          <h1>Bank of Rapperswil</h1>
          <Segment stacked>
            <Form>
              <h2>Registrieren</h2>
              <Form.Field>
                <Input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
              </Form.Field>
              <Form.Field>
                <Input onChange={this.handleFirstNameChanged} placeholder='Vorname' value={this.state.firstname} />
              </Form.Field>
              <Form.Field>
                <Input onChange={this.handleLastNameChanged} placeholder='Nachname' value={this.state.lastname} />
              </Form.Field>
              <Form.Field>
                <Input onChange={this.handlePasswordChanged} placeholder='Passwort' type="password" value={this.state.password} />
              </Form.Field>
              <Form.Field>
                <Button fluid size='large' onClick={this.handleSubmit}>Account eröffnen</Button>
              </Form.Field>
            </Form>
            { error && <p>Es ist ein Fehler aufgetreten!</p> }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Signup
