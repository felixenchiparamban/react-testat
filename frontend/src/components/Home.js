// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Segment, Button, Grid } from 'semantic-ui-react';

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <p>Willkommen zurück!</p>
          <Link to={'/dashboard'}>Zum Dashboard</Link>
        </div>
      : <Grid centered={true} verticalAlign="middle">
          <Grid.Column style={{width:400}}>
            <h1>Bank of Rapperswil</h1>
            <Segment stacked>
              <Form>
                <Form.Field>
                  <Button fluid size='large' as={Link} to={'/login'}>Einloggen</Button>
                </Form.Field>
                <Form.Field>
                  <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
                </Form.Field>
                <Form.Field>
                  <Button fluid size='large' as={Link} to={'/signup'}>Registrieren</Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
    }
  </div>
)

export default Home
