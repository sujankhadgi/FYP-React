import React from "react";
import "./book.css";
import { addReservation, deleteReservation } from "../Action/reservation"

import { getSingleBus } from "../Action/buses"
import { connect } from "react-redux"
import Modal from "react-modal"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class BookBus extends React.Component {
    constructor(props) {
        super(props);

        this.onSeatsChange = this.onSeatsChange.bind(this)
        this.onSeatsAdd = this.onSeatsAdd.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onBook = this.onBook.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onCancelReservation = this.onCancelReservation.bind(this)

        this.state = {
            seats_val: 0,
            departure_date: 0,
            total_booked_seats: [],
            isModalOpen: false
        }
    }
    componentWillMount() {
        this.props.getSingleBus(JSON.stringify(this.props.match.params.id));
    }

    onSeatsChange(e) {
        this.setState({
            seats_val: parseInt(e.target.value)
        })
    }

    onDateChange(e) {
        this.setState({
            departure_date: e.target.value
        })
    }

    onSeatsAdd() {
        const new_seats = this.state.total_booked_seats
        new_seats.push(this.state.seats_val)
        this.setState({
            total_booked_seats: new_seats
        })
    }

    onBook() {
        console.log(this.state.total_booked_seats)
        this.props.addReservation({
            "user_id": 0,
            "bus_id": this.props.match.params.id,
            "seats_number": this.state.total_booked_seats,
            "departure_date": this.state.departure_date
        })
            .then(() => {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                })
            })
    }

    onCloseModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    onCancelReservation() {
        this.props.deleteReservation({
            "user_id": 0,
            "bus_id": this.props.match.params.id,
        })
            .then(() => {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                })
            })
    }
    render() {
        return (
            <div className="book_container">
                <h4> Seat Layout Only </h4>

                <div>
                    <div>
                        <input type="number" placeholder="Seats Number" value={this.state.seats_val} onChange={this.onSeatsChange} />
                        <button onClick={this.onSeatsAdd}> Add </button>
                    </div>
                    <input type="date" placeholder="Departure Date" value={this.state.departure_date} onChange={this.onDateChange} />

                    <button onClick={this.onBook}> Book Ticket </button>
                </div>

                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.onCloseModal}
                    style={customStyles}
                    contentLabel="Reservation Detail"
                    ariaHideApp={false}
                >
                    <h4> Total Number of Seats: {this.state.total_booked_seats.length} </h4>
                    {
                        this.state.total_booked_seats.map((docs) => {
                            return <p key={docs}> Seats Number: {docs} </p>
                        })
                    }

                    <button> Confirm Booking </button>
                    <button onClick={this.onCancelReservation}> Cancel Reservation </button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bus: state.SingleBus != null ?
            state.SingleBus : null
    }
}

export default connect(mapStateToProps, { getSingleBus, addReservation, deleteReservation })(BookBus)