import React, { Component, Fragment } from 'react';
import '../../styles/RentalsList.css';


class RentalsList extends Component {
  constructor(props) {
    super(props)

    this.renderRentals = this.renderRentals.bind(this);
  }

  renderRentals(data) {
    return (
      <Fragment key={data.id}>
        <div className="row mt-3"></div>
        <div className="row mt-3"></div>
        <div className="row mt-3"></div>
        <div className="row mt-3"></div>

        <div className="row my-border">
          <div className="col-sm-7">
            <div className="row">
              <div className="col-sm-2">
                <div>City</div>
              </div>
              <div className="col-sm-2 apartment-value">
                <div>{data.city}</div>
              </div>
              <div className="col-sm-2 offset-sm-3">
                <div>Rooms</div>
              </div>
              <div className="col-sm-2 apartment-value">
                <div>{data.rooms}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <div>Address</div>
              </div>
              <div className="col-sm-2 apartment-value">
                <div>{data.address}</div>
              </div>
              <div className="col-sm-2 offset-sm-3">
                <div>Price</div>
              </div>
              <div className="col-sm-2 apartment-value">
                <div>{data.price}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 apartment-feature">
            <ul>{data.features.map(feature => <li key={feature} className="p-3">{feature}</li>)}</ul>
          </div>
          
          <div className="col-sm-1">
            <button className="btn btn-danger float-sm-right" onClick={() => this.props.onRemoveApartmentClick(data.id)}>remove</button>
          </div>
        </div>
      </Fragment>
    )
  };


  render() {
    return (
      <div>
          {this.props.rentals.map(this.renderRentals)}
      </div>
    );
  }
}

export default RentalsList;
