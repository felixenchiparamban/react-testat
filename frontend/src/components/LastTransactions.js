/**
 * Created by Keerthikan on 15-Apr-17.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import {Container, Header, Table, Button} from 'semantic-ui-react';
import type {Transaction} from '../api';
import {getTransactions} from '../api';

export type Props = {
    token: string
};

export type Transactions = {
    result: Array<Transaction>,
    query: { resultcount: number }
};


class LastTransactions extends React.Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            transactions: []
        }
    }

    render() {
        return (
            <Container>
                <Header as="h2">Last Transactions</Header>
                <Table stackable definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Von</Table.HeaderCell>
                            <Table.HeaderCell>Nach</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>Betrag</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>Saldo</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.transactions.map((tr: Transaction) => {
                                return (
                                    <Table.Row key={tr.date}>
                                        <Table.Cell>{new Date(tr.date).toLocaleString('ch')}</Table.Cell>
                                        <Table.Cell>{tr.from}</Table.Cell>
                                        <Table.Cell>{tr.target}</Table.Cell>
                                        <Table.Cell textAlign='right'>CHF {tr.amount.toFixed(2)}</Table.Cell>
                                        <Table.Cell textAlign='right'>CHF {tr.total.toFixed(2)}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <Button size='large' as={Link} to={'/transactions'}>Alle Transactionen zeigen</Button>
            </Container>
        );
    }

    getTransactionRows() {

    }

    componentDidMount() {

        // Use the api functions to call the API server. For example, the transactions
        // can be retrieved and stored in the state as follows:
        let currentDate = new Date();
        let toDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            currentDate.getHours()
        );
        getTransactions(this.props.token, new Date('2015-01-01'), toDate, 3)
            .then((transactions: Transactions) => {
                this.setState({transactions: transactions.result});
            });
    }
}

export default LastTransactions;