import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    componentWillMount() {
        this.props.setBreadcrumbs({
            signup: true
        });
    }

    componentWillUnmount() {
        this.props.clearAuthError();
    }

    handleFormSubmit = (formProps) => {
        this.props.signupUser(formProps);
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

    renderFieldSet = (label, form, inputType) => {
        return (
            <fieldset className="form-group">
                <label>{label}</label>
                <input className="form-control" type={inputType} {...form} />
                {form.touched && form.error && <div className="error">{form.error}</div>}
            </fieldset>
        );
    };

    render() {
        const { handleSubmit, fields: { username, password, passwordConfirm, email, firstName, lastName }} = this.props;

        return (
            <form className="flex" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Sign up</div>
                    </div>
                    <div className="form-input-wrapper">
                        {this.renderAlert()}
                        {this.renderFieldSet('First Name:', firstName, 'text')}
                        {this.renderFieldSet('Last Name:', lastName, 'text')}
                        {this.renderFieldSet('Email:', email, 'text')}
                        {this.renderFieldSet('Username:', username, 'text')}
                        {this.renderFieldSet('Password:', password, 'password')}
                        {this.renderFieldSet('Confirm Password:', passwordConfirm, 'password')}
                        <button action="submit" className="form-button">Sign up</button>
                    </div>

                </div>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.username) {
        errors.username = 'Please enter a username.';
    } else if (formProps.username.length < 3) {
        errors.username = 'Username must be at least 3 characters.';
    }

    if(!formProps.password) {
        errors.password = 'Please enter a password.';
    }

    if(!formProps.firstName) {
        errors.firstName = 'Please enter your first name.';
    }

    if(!formProps.lastName) {
        errors.lastName = 'Please enter your last name.';
    }

    if(!formProps.email) {
        errors.email = 'Please enter your email.';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Password does not match.'
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage : state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['username', 'password', 'passwordConfirm', 'firstName', 'lastName', 'email'],
    validate
}, mapStateToProps, actions)(Signup);