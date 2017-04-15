/**
 * Created by Keerthikan on 15-Apr-17.
 */
import React from 'react';
import {Container, Header, Form, Button} from 'semantic-ui-react';
import type {User} from '../api';
import type {Transaction} from '../api';

export type Props = {
    token: string
}

class NewPayment extends React.Component {

    constructor(props: Props){
        super(props);

        const tr : Transaction = {};
        this.state = {
            transaction: tr
        }

        this.onAmountChange = this.onAmountChange.bind(this);
    }

    render() {
        return (
            <Container>
                <Header as="h3">Neue Zahlung</Header>
                <Form>
                    <Form.Field>
                        <label>Von</label>
                        <input placeholder='Von' readOnly={true} value="100001"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nach</label>
                        <input placeholder='Zielkontonummer' value={this.state.transaction.target}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Betrag</label>
                        <input type="number" value={this.state.transaction.amount} onChange={this.onAmountChange}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }

    onAmountChange(e){
        let tr = this.state.transaction;
        tr.amount = e.target.value;
        this.setState({
            transaction: tr
        });
    }


}

export default NewPayment;