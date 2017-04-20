// @flow

import React from 'react';
import {Card, Header, Grid} from 'semantic-ui-react';

import NewPayment from './NewPayment';
import LastTransactions from './LastTransactions';

export type Props = {
    token: string
}

class Dashboard extends React.Component {

    constructor(props: Props) {
        super(props)

        const user = sessionStorage.getItem('user');
        this.state = {
            user: JSON.parse(user),
            paymentDone: 0
        }
        this.handleSuccessfulPayment = this.handleSuccessfulPayment.bind(this);
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
                    <Grid stackable>
                        <Grid.Row >
                            <Grid.Column width={6}>
                                <NewPayment token={this.props.token} user={this.state.user}
                                            onPaymentSuccess={this.handleSuccessfulPayment}></NewPayment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <LastTransactions token={this.props.token} updateTransactions={this.state.paymentDone}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>

            </Card>
        )
    }

    handleSuccessfulPayment(){
        this.setState({
            paymentDone: this.state.paymentDone + 1
        });
    }
}

export default Dashboard;
