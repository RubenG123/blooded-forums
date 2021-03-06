import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { NanoConsts } from '../../nanobar_consts';

class Signin extends Component {

    componentWillMount() {
        this.props.setBreadcrumbs({
            signin: true
        });
    }

    componentWillUnmount() {
        this.props.clearAuthError();
    }

    componentDidMount() {
        document.getElementById('username-input').focus();
    }

    handleFormSubmit = ({ username, password }) => {
        this.props.changeNanobar(NanoConsts.defaultColor);
        this.props.moveNanobar(30);
        this.props.signinUser({
            username,
            password,
            redirectUri: this.props.location.query.redirectUri
        }, () => {
            this.props.changeNanobar(NanoConsts.successColor);
            this.props.moveNanobar(100);
        }, () => {
            this.props.changeNanobar(NanoConsts.errorColor);
            this.props.moveNanobar(100);
        });
    };

    renderAlert = () => {
      if (this.props.errorMessage) {
          return (
            <div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
            </div>
          );
      }
    };

    render() {
        const { handleSubmit, fields: { username, password} } = this.props;

        return (
            <form className="flex" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Sign in</div>
                    </div>
                    <div className="form-input-wrapper">
                        <fieldset className="form-group">
                            <label>Username:</label>
                            <input id="username-input" type="text" {...username} className="form-control"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Password:</label>
                            <input {...password} type="password" className="form-control"/>
                        </fieldset>
                        {this.renderAlert()}
                        <button action="submit" className="form-button">Sign in</button>
                        <div className="forgot-password-tip">Forgotten your password? Message jake.</div>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);