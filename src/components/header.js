import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import renderUsername from '../helpers/username_renderer';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { backgroundPos: 0 };
    }

    componentDidMount() {
        setInterval(this.moveBanner, 100);
    }

    moveBanner = () => {
        this.setState({ backgroundPos: this.state.backgroundPos -1 });
    };

    onSignInClick = () => {
        browserHistory.push(`/signin?redirectUri=${this.props.path}`);
    };

    renderLinks = () => {
        if (this.props.user.authenticated) {
            return [
                <li key={0} className="nav-right">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>,
                <li key={1} className="nav-dropdown nav-right">
                    <div href="/" className="nav-dropbtn">{renderUsername(this.props.user)}</div>
                    <div className="nav-dropdown-content">
                        <ul>
                            <li><Link className="drop-item" to={`/profile/${this.props.user.id}`} >Profile</Link></li>
                            <li><Link className="drop-item" to="/settings" >Settings</Link></li>
                        </ul>
                    </div>
                </li>
            ];
        } else {
            return [
                <li key={0} className="nav-right">
                    <Link to="/signup" className="nav-signup">Sign up</Link>
                </li>,
                <li key={1} className="nav-right">
                    <a className="nav-link" onClick={this.onSignInClick}>
                        Existing user? Sign in &nbsp;<i className="fa fa-caret-down"> </i>
                    </a>
                </li>
            ];
        }
    };

    render() {
        return (
            <nav>
                <ul>
                    <li className="nav-left">
                        <img className="logo" src="https://i.imgur.com/JfDBtzi.png"/>
                    </li>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth,
    };
}

export default connect(mapStateToProps)(Header);