/**
 * Created by Keerthikan on 15-Apr-17.
 */
import React from 'react';
import {Container, Header, Form, Button} from 'semantic-ui-react';
import type {User} from '../api';
import type {Transaction} from '../api';
import {getAccountDetails, getAccount, transfer} from '../api';


export type Props = {
    token: string,
    user: User
};

export type AccountDetail = {
    accountNr: string,
    amount: number,
    owner: User
}

class NewPayment extends React.Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            targetAccount: '',
            amount: 0
        };

        this.onAmountChange = this.onAmountChange.bind(this);
        this.onTargetAccountChange = this.onTargetAccountChange.bind(this);
    }

    render() {
        return (
            <Container>
                <Header as="h3">Neue Zahlung</Header>
                <Form>
                    <Form.Field>
                        <label>Von</label>
                        <input placeholder='Von' readOnly={true}
                               value={this.state.fromAccount ?
                                   this.getAccountDescription(this.state.fromAccount) : this.props.user.accountNr}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nach</label>
                        <input placeholder='Zielkontonummer' value={this.state.targetAccount}
                               onChange={this.onTargetAccountChange}/>
                        <div ></div>
                    </Form.Field>
                    <Form.Field>
                        <label>Betrag</label>
                        <input type="number" value={this.state.amount} onChange={this.onAmountChange}/>
                    </Form.Field>
                    <Button type='submit' className="primary">Submit</Button>
                </Form>
            </Container>
        );
    }

    onAmountChange(e) {
        this.setState({
            amount: e.target.value
        });
    }


    onTargetAccountChange(e) {
        this.setState({
            targetAccount: e.target.value
        });
    }

    getAccountDescription(account: AccountDetail): string {
        return `${account.accountNr} (CHF ${account.amount.toFixed(2)})`
    }

    componentDidMount() {
        getAccountDetails(this.props.token)
            .then((fromAccount: AccountDetail) => {
                this.setState({fromAccount});
            })
            .catch((error: any) => {
                console.error(error);
            });
    }

}

export default NewPayment;