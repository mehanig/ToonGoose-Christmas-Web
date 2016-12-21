import React from "react"
import {connect} from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"

import {message, Col, Row} from 'antd';
import QueueAnim from 'rc-queue-anim';


@connect(state => ({
    counters: state.counters,
}))

export default class PrizeSelector extends React.Component {

    handleClick(prize_id) {
        let {dispatch} = this.props;
        dispatch(counterActions.selectPrize(prize_id))
    }

    componentWillMount() {
        let {dispatch, counters} = this.props;
        axios.get("/api/v1/goose/" + counters.gooseRollId + '/').then(function (response) {
            dispatch(counterActions.rollReceived({response}));
        }).catch(function (error) {
            dispatch(counterActions.rollReceived({error}));
        });
    }

    componentDidMount() {
        message.success('Congratulations! Now Select one gift!', 4);
    }

    getGooseClass(goose_id) {
        let {counters} = this.props;
        let goose1class = `goose-icon goose-icon__num-${counters.selected[0]} large-icon`;
        let goose2class = `goose-icon goose-icon__num-${counters.selected[1]} large-icon`;
        if (counters.selectedPrize === goose_id) {
            if (goose_id === 1) {
                return goose1class + " selected-goose-1";
            }
            if (goose_id === 2) {
                return goose2class + " selected-goose-2";
            }
        } else {
            if (goose_id === 1) {
                return goose1class
            }
            if (goose_id === 2) {
                return goose2class;
            }
        }
    }

    render() {
        let {counters} = this.props;

        return (
            <div className="prize-selector__main" style={{display: "inline", cursor: 'pointer'} }>
                <div className="prize-selector__description">
                    Here’s what the geese has given you this year!<br />
                    Chose a gift you wish to keep.
                </div>
                <QueueAnim>
                    <div key="0">
                        <Row>
                            <Col span={8} offset={4}>
                                <div className="prize-selector__prize prize1">
                                    <div className={this.getGooseClass(1)} onClick={() => this.handleClick(1)}></div>
                                    <div style={(counters.selectedPrize === 1) ? {color: "red"} : {color: "gray"}}
                                         onClick={() => this.handleClick(1)}> Prize1: {counters.prizes[0]} </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="prize-selector__prize prize2">
                                    <div className={this.getGooseClass(2)} onClick={() => this.handleClick(2)}></div>
                                    <div style={(counters.selectedPrize === 2) ? {color: "red"} : {color: "gray"}}
                                         onClick={() => this.handleClick(2)}> Prize2: {counters.prizes[1]} </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </QueueAnim>
            </div>
        )
    }
}