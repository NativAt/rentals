import React, { Component } from 'react';
import '../../styles/SearchBar.css';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
    this.props.onFilterChange({ term: event.target.value, field: this.props.searchField });
  }

  render() {
    return(
      <div className="row no-gutters"> 
        <div className="col-sm-12">
          <form>
            <div className="form-group">
              <input type="text" value={this.state.term} className="form-control rounded-0" placeholder={this.props.placeholder} onChange={this.handleChange} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;