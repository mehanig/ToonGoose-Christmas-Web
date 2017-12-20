import React from "react"
import {connect} from "react-redux"
import * as counterActions from "../actions/counterActions"

import QueueAnim from 'rc-queue-anim';
import {Button} from 'antd';

@connect(state => ({
    counters: state.counters,
}))

export default class GooseSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          height: 0
        }
    }
    
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

    gooseClassForNum(goose_id) {
        let {counters} = this.props;
        let classname = `goose-icon-inside goose-icon__num-${goose_id}`;
        // if (counters.selected.includes(goose_id)) {
        //     if (counters.selected[0] === goose_id) {
        //         return classname + " selected-goose-1"
        //     } else {
        //         return classname + " selected-goose-2"
        //     }
        // }
        return classname;
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
    }

    render() {
        let {counters} = this.props;

        return (
            <div className="gooses">
                <div className="gooses__ribbon"></div>
                <div style={{"font-size": "50px", cursor: "pointer", "text-align": "center"}} className="row">
                    <div className="gooses__selector-main">
                        <div className="gooses__selector_anim-block">
                            <div className="gooses__maxWidthContainer" key="0">
                                <div className="goose-icon" 
                                    ref={ (divElement) => this.divElement = divElement}  
                                    onClick={() => this.handleClick(1)}>
                                    <div className={this.gooseClassForNum(1)}></div>
                                    <div className={this.getGooseClass(1)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(2)}>
                                    <div className={this.gooseClassForNum(2)}></div>
                                    <div className={this.getGooseClass(2)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(3)}>
                                    <div className={this.gooseClassForNum(3)}></div>
                                    <div className={this.getGooseClass(3)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(4)}>
                                    <div className={this.gooseClassForNum(4)}></div>
                                    <div className={this.getGooseClass(4)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(5)}>
                                    <div className={this.gooseClassForNum(5)}></div>
                                    <div className={this.getGooseClass(5)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(6)}>
                                    <div className={this.gooseClassForNum(6)}></div>
                                    <div className={this.getGooseClass(6)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(7)}>
                                    <div className={this.gooseClassForNum(7)}></div>
                                    <div className={this.getGooseClass(7)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(8)}>
                                    <div className={this.gooseClassForNum(8)}></div>
                                    <div className={this.getGooseClass(8)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(9)}>
                                    <div className={this.gooseClassForNum(9)}></div>
                                    <div className={this.getGooseClass(9)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(10)}>
                                    <div className={this.gooseClassForNum(10)}></div>
                                    <div className={this.getGooseClass(10)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(11)}>
                                    <div className={this.gooseClassForNum(11)}></div>
                                    <div className={this.getGooseClass(11)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(12)}>
                                    <div className={this.gooseClassForNum(12)}></div>
                                    <div className={this.getGooseClass(12)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(13)}>
                                    <div className={this.gooseClassForNum(13)}></div>
                                    <div className={this.getGooseClass(13)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(14)}>
                                    <div className={this.gooseClassForNum(14)}></div>
                                    <div className={this.getGooseClass(14)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(15)}>
                                    <div className={this.gooseClassForNum(15)}></div>
                                    <div className={this.getGooseClass(15)}></div>
                                </div>
                                <div className="goose-icon" onClick={() => this.handleClick(16)}>
                                    <div className={this.gooseClassForNum(16)}></div>
                                    <div className={this.getGooseClass(16)}></div>
                                </div>
                            </div>
                        </div>
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
            </div>
        )
    }
}