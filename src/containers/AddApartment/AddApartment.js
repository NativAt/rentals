import React, { Component } from 'react';
// import '../../styles//SearchBar.css';


class AddApartment extends Component {
  constructor(props) {
    super(props);

    this.state = {
			city: '',
      address: '',
      rooms: '',
      price: ''
		};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddApartmentClick(this.state);
    this.setState({ 
			city: '',
      address: '',
      rooms: '',
      price: '',
      features: []
    });
  }

  handleChange(event) {
    let value;

    switch (event.target.type) {
      case 'number':
        value = Number(event.target.value);
        break;
      case 'select-multiple':
        value = [].slice.call(event.target.selectedOptions).map(o => {
          return o.value;
        });
        break
      default:
        value = event.target.value;
    }

    this.setState({
      [event.target.name]: value 
    });
	}

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-6">
            <label htmlFor="inputCity">City</label>
            <input name="city" type="text" value={this.state.city} className="form-control" id="inputCity" placeholder="City" onChange={this.handleChange} required />
          </div>
          <div className="form-group col-sm-6"> 
            <label htmlFor="inputAddress">Address</label>
            <input name="address" type="text" value={this.state.address} className="form-control" id="inputAddress" placeholder="Address" onChange={this.handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-6">
            <label htmlFor="inputRooms">Rooms</label>
            <input name="rooms" type="number" value={this.state.rooms} className="form-control" id="inputRooms" placeholder="Rooms" onChange={this.handleChange} required />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="inputPrice">Price</label>
            <input name="price" type="number" value={this.state.price} className="form-control" id="inputPrice" placeholder="Price" onChange={this.handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputFeatures">Features</label>
          <select name="features" value={this.state.features} onChange={this.handleChange} multiple className="form-control" id="inputFeatures">
            <option value="air condition">air condition</option>
            <option value="elevator">elevator</option>
            <option value="parking">parking</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success float-sm-right">submit</button>
      </form>
    );
  }
}

export default AddApartment;