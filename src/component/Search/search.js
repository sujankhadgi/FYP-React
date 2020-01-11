import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux"
import { getSingleBus } from "../Action/buses"
import { getRoutes } from "../Action/routes"


import Transfer from "../../assets/transfer.png"
import "./search.css"

// make changes on backend for search algorithm

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.onViewDetail = this.onViewDetail.bind(this)
        this.onBookBus = this.onBookBus.bind(this)
        this.onFromChange = this.onFromChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onModify = this.onModify.bind(this)
        this.onRouteSearch = this.onRouteSearch.bind(this)

        this.state = {
            "from": this.props.match.params.from,
            "to": this.props.match.params.to,
            "modify": false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.routes === null) {
                this.props.getRoutes({
                    "from": this.props.match.params.from,
                    "to": this.props.match.params.to
                })
                    .then(() => {
                        if (this.props.routes === null) {
                            this.props.history.push('/')
                        }
                    })
            }
        }, 2000)
    }

    onFromChange(e) {
        this.setState({
            from: e.target.value
        })
    }

    onToChange(e) {
        this.setState({
            to: e.target.value
        })
    }

    onViewDetail(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/detail`)
    }

    onBookBus(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/book/${JSON.parse(docs.bus_id)}`)
    }

    onModify(e) {
        e.preventDefault()

        this.setState({
            modify: !this.state.modify
        })
    }

    onRouteSearch() {
        console.log(this.state.from, this.state.to, 0)
        this.props.getRoutes({
            "from": this.state.from,
            "to": this.state.to,
            "no_of_people": 0
        })
            .then(() => {
                this.props.history.push(`/search/${this.state.from}/${this.state.to}/result`)
                this.setState({
                    modify: !this.state.modify
                })
            })
    }
    render() {
        return (
            <div className="container m_search">
                <div className="row m_search-header">
                    <div className='col m_search-header-1'>
                        {
                            this.props.routes != null ?
                                this.props.routes.length > 1 ?
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>({this.props.routes.length})</span> Bus Found
                                        from <span style={{ fontWeight: "bold" }}> {this.props.match.params.from} </span>
                                        to <span style={{ fontWeight: "bold" }}> {this.props.match.params.to} </span>
                                    </p> :
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>({this.props.routes.length})</span> Bus Found
                                        from <span style={{ fontWeight: "bold" }}> {this.state.from} </span>
                                        to <span style={{ fontWeight: "bold" }}> {this.state.to} </span>
                                    </p>
                                : null
                        }
                    </div>

                    <div className='col m_search-header-2'>
                        {
                            !this.state.modify ?
                                <div className="m_search-normal">
                                    <h5 className="m_search-normal-from"> {this.state.from} </h5>
                                    <img className="m_search-normal-icon" src={Transfer} />
                                    <h5 className="m_search-normal-to"> {this.state.to} </h5>

                                    <button className="m_search-normal-btn btn btn-primary" onClick={this.onModify}> Modify </button>
                                </div> :
                                <div className='m_search-normal'>
                                    <input type="text" placeholder="From" value={this.state.from} onChange={this.onFromChange} />
                                    <input type="text" placeholder="To" value={this.state.to} onChange={this.onToChange} />

                                    <button className="btn btn-primary" onClick={this.onRouteSearch}> Search </button>


                                    <button onClick={this.onModify}> cancel </button>
                                </div>
                        }
                    </div>
                </div>
                <div className="row m_search-container">
                    {
                        this.props.routes != null ?
                            this.props.routes.map((docs) => {
                                return (
                                    <div className="col">
                                        <Card className={useStyles.card} key={docs.uid}>
                                            <CardContent>
                                                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                                    {docs.route_from} - {docs.route_to}
                                                </Typography>
                                                <Typography variant="h5" component="h2">
                                                    Route: {docs.highway} Highway
                                                </Typography>
                                                <Typography className={useStyles.pos} color="textSecondary">
                                                    {
                                                        docs.bus_id.length > 1
                                                            ? <p style={{ color: "green" }}> Bus Is Available </p>
                                                            : <p style={{ color: "red" }}> No Bus available </p>
                                                    }
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.onBookBus(docs)}
                                                >
                                                    Book Bus
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.onViewDetail(docs)}
                                                >
                                                    View Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                )
                            }) : <p> Searching Routes... </p>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        routes: state.searched_routes != null
            ? state.searched_routes.result.map((docs) => {
                return docs
            })
            : null
    }
}

export default connect(mapStateToProps, { getSingleBus, getRoutes })(Search)
