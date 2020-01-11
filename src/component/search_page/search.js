import React from "react";
import "./search.css"
import Model from "react-modal"


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        height: "20%"
    }
};

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.onFromChange = this.onFromChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onPeopleChange = this.onPeopleChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onModelClose = this.onModelClose.bind(this)

        this.state = {
            from: "",
            to: "",
            date: "",
            people: "",
            error: "",
            isModelOpen: true
        }
    }

    onModelClose() {
        this.setState({
            isModelOpen: false
        })

        this.props.history.push('/')
    }

    onFromChange(e) {
        this.setState({
            people: e.target.value
        })
    }

    onToChange(e) {
        this.setState({
            date: e.target.value
        })
    }

    onDateChange(e) {
        this.setState({
            to: e.target.value
        })
    }

    onPeopleChange(e) {
        this.setState({
            from: e.target.value
        })
    }

    onSearch() {
        const { from, to, date, people } = this.state

        if (from && to && people) {

        }
        else {
            this.setState({
                error: "Please Fill All Field"
            })
        }

    }
    render() {
        return (
            <div className="search_main">
                <Model
                    isOpen={this.state.isModelOpen}
                    onRequestClose={this.onModelClose}
                    style={customStyles}
                    contentLabel="Search Box"
                >
                    <div className="model">
                        <h4 className="model-title"> Search Route </h4>
                        <button className="model-exit" onClick={this.onModelClose}> Exit </button>

                        <div className="model-form">
                            <input type="text" placeholder="From:" name="from" className="model-form-1" value={this.state.from} onChange={this.onFromChange} />
                            <input type="text" placeholder="To:" name="to" className="model-form-2" value={this.state.to} onChange={this.onToChange} />
                            <input type="date" placeholder="Date" name="date" className="model-form-3" value={this.state.date} onChange={this.onDateChange} />
                            <input type="number" placeholder="Number of People" name="people" className="model-form-4" value={this.state.people} onChange={this.onPeopleChange} />

                            <button className="model-search" onClick={this.onSearch}> Search </button>
                        </div>

                        {
                            this.state.error ? <p> {this.state.error} </p> : null
                        }
                    </div>
                </Model>
            </div>
        )
    }
}

export default Search