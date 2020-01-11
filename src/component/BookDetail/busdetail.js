import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Wifi from "../../assets/wifi.png"
import TV from "../../assets/television.png"
import Plug from "../../assets/plug.png"
import Bottle from "../../assets/bottle.png"
import "./book.css"

// Main Focus for UI
class BusDetails extends React.Component {
    constructor(props) {
        super(props);

        this.onBookBus = this.onBookBus.bind(this);
    }
    componentWillMount() {
        setTimeout(() => {
            if (this.props.bus === null) {
                this.props.history.push("/")
            }
        }, 1500)
    }

    onBookBus() {
        this.props.history.push(`/bus/${this.props.match.params.from}/${this.props.match.params.to}/book/${JSON.parse(this.props.bus.uid)}`)
    }

    render() {
        console.log(this.props.bus)
        if (this.props.bus != null) {
            console.log(this.props.bus.amenities.wifi)
        }
        return (
            <div className="book_container">
                {
                    this.props.bus != null ?
                        <div className="book_container-detail">
                            <div className="book_container-detail-1">
                                <h5 style={{ textTransform: "uppercase" }}> {this.props.match.params.from} - {this.props.match.params.to} </h5>
                                <h5> Bus Name: {this.props.bus.name} </h5>
                                <h5> Bus Number: {this.props.bus.bus_number} </h5>
                                <h5> Bus Contact: {this.props.bus.bus_contact} </h5>
                                <h5> Company: {this.props.bus.company} </h5>
                            </div>

                            <div className="book_container-detail-2">
                                <h3> Luxury Type: {this.props.bus.lux_type} </h3>
                                <h3> Total Seats: {this.props.bus.total_seats} </h3>
                                {/* Available Seats Need to be Integrate */}
                            </div>

                            <div className="book_container-book">
                                <button className="btn btn-primary" onClick={this.onBookBus}> Book Bus </button>
                            </div>
                        </div>
                        :
                        <p> Bus is not available. <Link to="/"> Please Visit Home Page </Link> </p>
                }
                {/* Routes from - to , bus seats availables , facilities , bus luxury type */}

                {
                    this.props.bus != null ?
                        <div className="book_container-description">
                            <div className="book_container-description-1">
                                <p> {this.props.bus.bus_description} </p>

                                <div>
                                    {
                                        this.props.bus.amenities.wifi ?
                                            <img src={Wifi} style={{ height: '50%', width: '50%' }} /> : null
                                    }

                                    {
                                        this.props.bus.amenities.tv ?
                                            <img src={TV} style={{ height: '50%', width: '50%' }} /> : null
                                    }

                                    {
                                        this.props.bus.amenities.water_bottle ?
                                            <img src={Bottle} style={{ height: '50%', width: '50%' }} /> : null
                                    }

                                    {
                                        this.props.bus.amenities.charging_plug ?
                                            <img src={Plug} style={{ height: '50%', width: '50%' }} /> : null
                                    }
                                </div>
                            </div>
                            <div className="book_container-description-2">
                                <div className="book_description-img-1">
                                    <img src={this.props.bus.bus_image} style={{ height: '100%', width: "100%" }} />
                                </div>

                                <div className="book_description-img-2">
                                    <img src={this.props.bus.bus_image} style={{ height: '100%', width: "100%" }} />
                                </div>

                                <div className="book_description-img-3">
                                    <img src={this.props.bus.bus_image} style={{ height: '100%', width: "100%" }} />
                                </div>
                            </div>


                        </div>
                        : null
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bus: state.SingleBus != null ? state.SingleBus : null
    }
}

export default connect(mapStateToProps)(BusDetails)


// (Enhance Search Algorithms incl dates , nof ppl , availables seats , price)
// Authentication (last)

//  -- UI PART --

// Book (incl. Seat Layout) and Backend Seats Architecture (Reservation)
// UI
// Admin Reservation List