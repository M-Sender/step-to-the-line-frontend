import React from "react";
import {RangeStepInput} from 'react-range-step-input';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    render() {
        return <div>
            <RangeStepInput
                min={0} max={5}
                value={this.state.value} step={1}
                onChange={this.onChange.bind(this)}
            />
        </div>;
    };
    onChange(e) {
        //const newVal = forceNumber(e.target.value);
        //this.setState({value: newVal});
    }
};

export default Slider;