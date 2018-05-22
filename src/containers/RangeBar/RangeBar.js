import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../../styles/RangeBar.css';


class RangeBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.min,
      range: {
        min: props.min,
        max: props.max,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ range: value });
    this.props.onFilterChange({ range: value, field: this.props.rangeField });
  }

  render() {
    return (
      <form className="form">
        <div className="form-group">
          <InputRange
            allowSameValues = {true}
            maxValue = {this.props.max}
            minValue = {this.props.min}
            formatLabel = {value => value}
            value = {this.state.range}
            onChange = {value => this.handleChange(value)}
            onChangeComplete = {value => console.log(value)} />
          </div>
      </form>
    );
  }
}


export default RangeBar;
