import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import RentalsList from '../containers/RentalsList/RentalsList';
import SearchBar from '../containers/SearchBar/SearchBar';
import RangeBar from '../containers/RangeBar/RangeBar';
import AddApartment from '../containers/AddApartment/AddApartment';
import { ROOT_URL } from '../config';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartments: [],
      showAddApartmentForm: false,
      range: { 
        rooms: {
          min: 0,
          max: 0
        },
        price: {
          min: 0,
          max: 0
        }
      }
    };

    this.fetchApartments = this.fetchApartments.bind(this);
    this.addApartment = this.addApartment.bind(this);
    this.removeApartment = this.removeApartment.bind(this);
    this.onClickShowAddApartmentForm = this.onClickShowAddApartmentForm.bind(this);
    this.findMinMaxFieldRange = this.findMinMaxFieldRange.bind(this);
    this.initApartments();
  }

  onClickShowAddApartmentForm() {
    this.setState({ showAddApartmentForm: !this.state.showAddApartmentForm });
  }

  // alike function should be on the server-side
  findMinMaxFieldRange(apartments) {
    const range = {
      rooms: {
        min: 0,
        max: 1
      },
      price: {
        min: 0,
        max: 1
      }
    };

    for (let apartment of apartments) {
      range.rooms.min  = apartment.rooms < range.rooms.min ? apartment.rooms : range.rooms.min;
      range.rooms.max = apartment.rooms > range.rooms.max ? apartment.rooms : range.rooms.max;

      range.price.min  = apartment.price < range.price.min ? apartment.price : range.price.min;
      range.price.max = apartment.price > range.price.max ? apartment.price : range.price.max;
    }

    return range;
  }

  async initApartments() {
    try {
      const response = await axios.get(ROOT_URL);
      const { data } = response;

      // on first init get all max & min field for the range bar
      const range = this.findMinMaxFieldRange(data);

      this.setState({
        apartments: data,
        range
      });

    } catch (err) {
        throw err;
    }
  }

  async fetchApartments({ term, range, field } = {}) {
    let URL;
    URL = term ? `${ROOT_URL}?${field}_like=${term}` : ROOT_URL;
    URL = range ? `${ROOT_URL}?${field}_gte=${range.min}&${field}_lte=${range.max}` : URL;
    
    try {
      const response = await axios.get(URL);
      const { data } = response;
      this.setState({ apartments: data });
    } catch (err) {
        throw err;
    }
  };

  async addApartment(data) {
    // hide add apartment form on submit
    this.onClickShowAddApartmentForm();

    try {
      const response = await axios.post(`${ROOT_URL}`, {
        city: data.city,
        address: data.address,
        rooms: data.rooms,
        price: data.price,
        features: data.features || []
      });

      if (response && response.status === 201)
        this.fetchApartments();
    } catch (err) {
        throw err;
    }
  };

  async removeApartment(apartmentId) {
    try {
      const response = await axios.delete(`${ROOT_URL}/${apartmentId}`);

      if (response && response.status === 200)
        this.setState({
          apartments: this.state.apartments
            .filter(apartment => apartment.id !== apartmentId)
        })
    } catch (err) {
        throw err;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Rentals</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <SearchBar searchField={'city'} placeholder='Search City...' onFilterChange={this.fetchApartments} />
          </div>
          <div className="col-sm-3">
            <SearchBar searchField={'address'} placeholder='Search Address...' onFilterChange={this.fetchApartments} />
          </div>
          <div className="col-sm-1 mt-2">
            Rooms
          </div>
          <div className="col-sm-2 mt-2">
            <RangeBar 
              rangeField={'rooms'} 
              min={this.state.range.rooms.min} 
              max={this.state.range.rooms.max} 
              onFilterChange={this.fetchApartments} />
          </div>
          <div className="col-sm-1 mt-2">
            Price
          </div>
          <div className="col-sm-2 mt-2">
            <RangeBar 
              rangeField={'price'}
              min={this.state.range.price.min} 
              max={this.state.range.price.max} 
              onFilterChange={this.fetchApartments} />
          </div>
        </div>
        <div className="row mt-3"></div>
        <div className="row">
          <div className="col-sm-2">
            <button className={!this.state.showAddApartmentForm ? 'btn btn-primary' : 'btn btn-danger'} onClick={this.onClickShowAddApartmentForm}>{!this.state.showAddApartmentForm ? 'add apartment' : 'cancel'}</button>
          </div>
        </div>
        <div className="row mt-3"></div>
        <div className="row">
          <div className={`col-sm-12 ${!this.state.showAddApartmentForm ? 'hide' : ''}`}>
            <AddApartment onAddApartmentClick={this.addApartment} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <RentalsList rentals={this.state.apartments} onRemoveApartmentClick={this.removeApartment} />
          </div>
        </div>
        <div className="row mt-3"></div>
        <div className="row mt-3"></div>
        <div className="row">
          <div className="col-sm-12">
          {this.state.apartments.length} apartments
          </div>
        </div>
      </div>
    );
  }
}

export default App;
