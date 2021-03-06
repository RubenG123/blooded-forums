import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import slugTitle from '../helpers/title_sluger';

class Breadcrumbs extends Component {

    renderCategory = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.category != null) {
            const category = this.props.breadcrumbs.category;

            return (
                <li>
                    <Link className="crumbs-link" to={`/category/${category.id}-${slugTitle(category.title)}`}>{category.title}</Link>
                </li>

            );
        }
    };

    renderSubCategory = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.subcategory != null) {
            const subcategory = this.props.breadcrumbs.subcategory;

            return (
                <li>
                    <Link className="crumbs-link" to={`/forum/${subcategory.id}-${slugTitle(subcategory.title)}`}>{subcategory.title}</Link>
                </li>
            );
        }
    };

    renderThread = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.thread != null) {
            const thread = this.props.breadcrumbs.thread;

            return (
                <li>
                    <Link className="crumbs-link" to={`/topic/${thread.id}-${slugTitle(thread.title)}`}>{thread.title}</Link>
                </li>
            );
        }
    };

    renderSpecial = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.profile != null) {
            const profile = this.props.breadcrumbs.profile;

            return (
                <li>
                    <Link className="crumbs-link" to={`/profile/${profile.id}`}>{profile.username}</Link>
                </li>
            )
        }

        if(this.props.breadcrumbs != null && this.props.breadcrumbs.setting != null) {
            return (
                <li>
                    <Link className="crumbs-link" to={`/settings`}>Settings</Link>
                </li>
            )
        }

        if(this.props.breadcrumbs != null && this.props.breadcrumbs.signin != null) {
            return (
                <li>
                    <Link className="crumbs-link" to={`/signin`}>Sign in</Link>
                </li>
            )
        }

        if(this.props.breadcrumbs != null && this.props.breadcrumbs.signout != null) {
            return (
                <li>
                    <Link className="crumbs-link" to={`/signout`}>Sign out</Link>
                </li>
            )
        }

        if(this.props.breadcrumbs != null && this.props.breadcrumbs.signup != null) {
            return (
                <li>
                    <Link className="crumbs-link" to={`/signup`}>Sign up</Link>
                </li>
            )
        }

    };

    render() {
        return (
            <ul id="crumbs">
                <li>
                    <Link to="/" className="crumbs-link">Home</Link>
                </li>
                {this.renderSpecial()}
                {this.renderCategory()}
                {this.renderSubCategory()}
                {this.renderThread()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return { breadcrumbs: state.breadcrumbs.breadcrumbs };
}

export default connect(mapStateToProps, null)(Breadcrumbs);