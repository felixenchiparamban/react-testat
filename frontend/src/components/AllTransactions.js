// @flow

import React from 'react'
import {Button, Segment} from 'semantic-ui-react'

import type {User} from '../api'

import * as api from '../api'

export type Props = {
    token: string,
    user: User,
}

const startYear = 2015;
const endYear = 2017;

const years = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class AllTransactions extends React.Component {

    props: Props;

    state = {
        selectedYear: 2017,
        selectedMonth: 0,
        skip: 0,
        transactions: [],
        query: {}
    };

    constructor() {
        super();
        this.initYears();
    }

    initYears() {
        for (let i = startYear; i <= endYear; i++) {
            years.push(i);
        }
    };

    componentDidMount() {
        this.getAllTransaction();
    };

    getAllTransaction() {
        const {selectedYear, selectedMonth} = this.state;
        const fromDate = new Date(selectedYear, selectedMonth, 1);
        const toDate = new Date(selectedYear, selectedMonth, 32 - new Date(selectedYear, selectedMonth, 32).getDate());
        api.getTransactions(this.props.token, fromDate, toDate, 10, this.state.skip)
            .then(data => {
                console.log(data);
                this.setState({transactions: data.result, query: data.query})
            });
    };

    onMonthChange = (event) => {
        this.setState({selectedMonth: event.target.value, skip: 0}, this.getAllTransaction.bind(this));

    };

    onYearChange = (event) => {
        this.setState({selectedYear: event.target.value, skip: 0}, this.getAllTransaction.bind(this));
    };

    nextPage = (event) => {
        this.setState({skip: this.state.skip + 10}, this.getAllTransaction.bind(this));
    };

    previourPage = (event) => {
        this.setState({skip: this.state.skip - 10}, this.getAllTransaction.bind(this));
    };

    render() {
        return (
            <Segment stacked>
                <div>
                    <div>
                        <h4>All Transaktionen des Accounts {this.props.user.accountNr}</h4>
                        <div>
                            <select onChange={this.onYearChange}>
                                { years.map(year => {
                                    return <option key={year} value={year}>{year}</option>
                                })
                                }
                            </select>
                            <select onChange={this.onMonthChange}>
                                { months.map((month, index) => {
                                    return <option key={month} value={index}>{month}</option>
                                })
                                }
                            </select>
                        </div>
                        {this.state.transactions.length > 0
                            ? <div>
                                <table className="ui definition table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Von</th>
                                        <th>Zu</th>
                                        <th>Betrag</th>
                                        <th>Saldo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.transactions.map(data => {
                                            return (
                                                <tr key={data.date + data.from + data.accountNr}>
                                                    <td>{data.date }</td>
                                                    <td>{data.from}</td>
                                                    <td>{data.target}</td>
                                                    <td>{data.amount + " CHF" }</td>
                                                    <td>{data.total + " CHF"} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                <Button.Group>
                                    <Button labelPosition='left' icon='left chevron' content='Back'
                                            onClick={this.previourPage} disabled={this.state.skip === 0}/>
                                    <Button labelPosition='right' icon='right chevron' content='Forward'
                                            onClick={this.nextPage}
                                            disabled={this.state.skip >= this.state.query.resultcount -10}/>
                                </Button.Group>
                            </div>
                            : <Button color='red'> In diesem Zeitraum wurden keine Transaktionen getätigt</Button>
                        }
                    </div>
                </div>
            </Segment>
        )
    }
}

export default AllTransactions
