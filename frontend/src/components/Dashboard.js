// @flow

import React from 'react';
import {Card, Grid} from 'semantic-ui-react';
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

    constructor(props: any) {
        super(props)

        const user = sessionStorage.getItem('user');
        this.state = {
            user: JSON.parse(user),
        }
    }

    render() {
        console.log(this.state);
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Dashboard - {this.state.user.accountNr}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <NewPayment></NewPayment>
                            </Grid.Column>
                            <Grid.Column>
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
