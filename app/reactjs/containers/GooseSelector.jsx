import React from "react"
import {connect} from "react-redux"
import * as counterActions from "../actions/counterActions"

import QueueAnim from 'rc-queue-anim';
import {Button} from 'antd';

@connect(state => ({
    counters: state.counters,
}))

export default class GooseSelector extends React.Component {
    handleClick(goose_id) {
        let {dispatch} = this.props;
        dispatch(counterActions.selectGoose(goose_id))
    }

    askForEmail() {
        let {dispatch} = this.props;
        dispatch(counterActions.askForEmail())
    }

    getGooseClass(goose_id) {
        let {counters} = this.props;
        if (counters.selected.includes(goose_id)) {
            if (counters.selected[0] === goose_id) {
                return "selected-square-1"
            } else {
                return "selected-square-2"
            }
        } else {
            return "selected-square-hidden"
        }
    }

    render() {
        let {counters} = this.props;

        return (
            <div className="gooses">
                <div className="gooses__ribbon"></div>
                <div style={{"font-size": "50px", cursor: "pointer", "text-align": "center"}} className="row">
                    <div className="gooses__selector-main">
                        <QueueAnim delay={300}>
                            <div className="gooses__maxWidthContainer" key="0">
                                <div className="goose-icon">
                                    <div className="goose-icon goose-icon__num-1"
                                     onClick={() => this.handleClick(1)}></div>
                                    <div className={this.getGooseClass(1)}></div>
                                </div>
                                <div className="goose-icon">
                                    <div className="goose-icon goose-icon__num-2"
                                     onClick={() => this.handleClick(2)}></div>
                                    <div className={this.getGooseClass(2)}></div>
                                </div>
                                <div className="goose-icon">
                                    <div className="goose-icon goose-icon__num-3"
                                     onClick={() => this.handleClick(3)}></div>
                                    <div className={this.getGooseClass(3)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-4"
                                     onClick={() => this.handleClick(4)}></div>
                                    <div className={this.getGooseClass(4)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-5"
                                     onClick={() => this.handleClick(5)}></div>
                                    <div className={this.getGooseClass(5)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-6"
                                     onClick={() => this.handleClick(6)}></div>
                                    <div className={this.getGooseClass(6)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-7"
                                     onClick={() => this.handleClick(7)}></div>
                                    <div className={this.getGooseClass(7)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-8"
                                     onClick={() => this.handleClick(8)}></div>
                                    <div className={this.getGooseClass(8)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-9"
                                     onClick={() => this.handleClick(9)}></div>
                                    <div className={this.getGooseClass(9)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-10"
                                     onClick={() => this.handleClick(10)}></div>
                                    <div className={this.getGooseClass(10)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-11"
                                     onClick={() => this.handleClick(11)}></div>
                                    <div className={this.getGooseClass(11)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-12"
                                     onClick={() => this.handleClick(12)}></div>
                                    <div className={this.getGooseClass(12)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-13"
                                     onClick={() => this.handleClick(13)}></div>
                                    <div className={this.getGooseClass(13)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-14"
                                     onClick={() => this.handleClick(14)}></div>
                                    <div className={this.getGooseClass(14)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-15"
                                     onClick={() => this.handleClick(15)}></div>
                                    <div className={this.getGooseClass(15)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-16"
                                     onClick={() => this.handleClick(16)}></div>
                                    <div className={this.getGooseClass(16)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-17"
                                     onClick={() => this.handleClick(17)}></div>
                                    <div className={this.getGooseClass(17)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-18"
                                     onClick={() => this.handleClick(18)}></div>
                                    <div className={this.getGooseClass(18)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-19"
                                     onClick={() => this.handleClick(19)}></div>
                                    <div className={this.getGooseClass(19)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-20"
                                     onClick={() => this.handleClick(20)}></div>
                                    <div className={this.getGooseClass(20)}></div>
                                </div>
                                <div className="goose-icon">
                                <div className="goose-icon goose-icon__num-21"
                                     onClick={() => this.handleClick(21)}></div>
                                    <div className={this.getGooseClass(21)}></div>
                                </div>
                            </div>
                            <div key="99">
                                <div className="two__gooses-button">
                                    <Button type="primary" icon="smile-o" style={{width: '30%', 'font-size': '16px'}}
                                            disabled={!(counters.twoGoosesSelected)} onClick={() => this.askForEmail()}>
                                        Get a prize!
                                    </Button>
                                </div>
                            </div>
                        </QueueAnim>
                    </div>
                </div>
            </div>
        )
    }
}