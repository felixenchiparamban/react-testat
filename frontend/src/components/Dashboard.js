// @flow

import React from 'react';
import {Card, Header, Grid} from 'semantic-ui-react';
import NewPayment from './NewPayment';
import LastTransactions from './LastTransactions';
import type {User} from '../api'

/*
 Use the api functions to call the API server. For example, the transactions
 can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 )

 import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
 */

export type Props = {
    token: string
}

class Dashboard extends React.Component {

    constructor(props: Props) {
        super(props)

        const user = sessionStorage.getItem('user');
        this.state = {
            user: JSON.parse(user),
        }
    }

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Header as="h2">Kontoübersicht - {this.state.user.accountNr}</Header>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid columns={3} stackable>
                        <Grid.Row >
                            <Grid.Column>
                                <NewPayment token={this.props.token}></NewPayment>
                            </Grid.Column>
                            <Grid.Column >
                                <LastTransactions/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>

            </Card>
        )
    }
}

export default Dashboard
