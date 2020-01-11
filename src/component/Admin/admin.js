import React from "react";
import Routes from "./routes"
import Buses from "./bus"
import Reservation from "./reservation"

import { getAllBuses } from "../Action/buses"

import "./admin.css"
import { connect } from "react-redux";

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComp: 0
        }
    }

    onShowComp(val) {
        this.setState({
            showComp: val
        })
    }

    componentDidMount() {
        this.props.getAllBuses()
    }

    render() {
        return (
            <div className="admin_container container">
                <div className="m_admin-header">
                    <div className="m_admin-header_content row">
                        <div className='col'>
                            <a onClick={() => this.onShowComp(0)}> Routes </a>
                        </div>
                        <div className='col'>
                            <a onClick={() => this.onShowComp(1)}> Buses </a>
                        </div>
                        <div className='col'>
                            <a onClick={() => this.onShowComp(2)}> Reservations </a>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {
                        this.state.showComp === 0 ?
                            <Routes /> :
                            this.state.showComp === 1 ?
                                <Buses /> :
                                <Reservation />
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, { getAllBuses })(Admin)