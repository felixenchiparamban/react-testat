/**
 * Created by Keerthikan on 15-Apr-17.
 */
import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import type {User} from '../api';

export type Props = {
    token: string,
    user : User
}

class NewPayment extends React.Component {

    render() {
        return (
            <Container>
                <Header as="h2">New Payment</Header>
            </Container>
        );
    }
}

export default NewPayment;