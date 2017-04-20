/**
 * Created by Keerthikan on 15-Apr-17.
 */
import React from 'react';
import {Container, Header, Form, Button} from 'semantic-ui-react';

import type {User} from '../api';
import type {TransferResult} from '../api';
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

export type TargetAccount = {
    accountNr: AccountNr,
    owner: {
        firstname: string,
        lastname: string
    }
}

class NewPayment extends React.Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            targetAccountNr: '1000002',
            targetAccount: null,
            amount: 0,
            isAmountValid: false
        };

        this.onAmountChange = this.onAmountChange.bind(this);
        this.onTargetAccountChange = this.onTargetAccountChange.bind(this);
        this.pay = this.pay.bind(this);
    }

    render() {
        return (
            <Container>
                <Header as="h3">Neue Zahlung</Header>
                <Form onSubmit={this.pay}>
                    <Form.Field>
                        <label>Von</label>
                        <input placeholder='Von' readOnly={true}
                               value={this.state.fromAccount ?
                                   this.getAccountDescription(this.state.fromAccount) : this.props.user.accountNr}/>
                    </Form.Field>
                    <Form.Field className={this.isTargetAccountValid.bind(this) ? "" : "error"}>
                        <label>Nach</label>
                        <input placeholder='Zielkontonummer' value={this.state.targetAccountNr}
                               onChange={this.onTargetAccountChange}/>
                        <div className="error" hidden={this.isTargetAccountValid()}>
                            {this.state.targetAccountNr} ist ungültig
                        </div>
                    </Form.Field>
                    <Form.Field className={this.state.amount && !this.state.isAmountValid ? "error" : ""}>
                        <label>Betrag</label>
                        <input type="number" value={this.state.amount} onChange={this.onAmountChange}/>
                    </Form.Field>
                    <Button type='submit' className="primary" onClick={this.pay}
                            disabled={!this.state.isAmountValid || !this.state.targetAccount}>Zahlen</Button>
                </Form>
            </Container>
        );
    }

    pay(e) {
        if (this.state.isAmountValid && this.state.targetAccount) {
            transfer(this.state.targetAccountNr, this.state.amount, this.props.token)
                .then((result: TransferResult) => {
                    this.props.onPaymentSuccess();
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
        e.preventDefault();
    }

    onAmountChange(e) {
        const value = e.target.value;
        this.setState({
            isAmountValid : (!isNaN(value) && value > 0) ? true : false,
            amount: value
        });
    }

    isTargetAccountValid() {
        return this.state.targetAccountNr ? this.state.targetAccount : true;
    }

    onTargetAccountChange(e) {
        const value = e.target.value;
        this.setState({
            targetAccountNr: value
        });

        getAccount(value, this.props.token)
            .then((account: TargetAccount) => {
                this.setState({
                    targetAccount: account
                });
            })
            .catch((error: any) => {
                this.setState({
                    targetAccount: null
                });
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