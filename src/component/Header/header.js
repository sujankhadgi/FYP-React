import React from "react";
import { withRouter } from "react-router-dom"
import "./header.css"
import VisitNepal from "../../assets/visit_np.png"

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.redirectMe = this.redirectMe.bind(this)

        this.state = {
            headers: [
                { title: "home", redirect: "/" },
                { title: "sign in", redirect: '/login' },
                { title: "create account", redirect: '/register' }
            ]
        }
    }

    redirectMe(to) {
        this.props.history.push(`${to}`)
    }
    render() {
        return (
            <div className="header_main">
                <div className="header_left">
                    <img src={VisitNepal} className="left-img" />
                </div>
                <div className="header_right">
                    <button className="right-btn" onClick={() => this.redirectMe('/search')}> Search </button>

                    <div className="right-list">
                        {
                            this.state.headers.map((docs, i) => {
                                return <a className={`right-list-${i + 1}`} onClick={() => this.redirectMe(docs.redirect)}> {docs.title} </a>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);