import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ForumCategory from './forum_category';

class Forum extends Component {

    componentWillMount() {
        if(!this.props.categories) {
            this.props.getForumSections();
        }
    }

    renderCategories = () => {
        return this.props.categories.map( category => {
            return (
                <ForumCategory key={category.id} category={category}/>
            );
        });
    };

    render() {
        const categories = this.props.categories;

        if (categories) {
            return (
                <div id="categories-wrapper">
                    {this.renderCategories()}
                </div>
            );
        }

        return (
            <div>Loading!</div>
        );
    }
}

function mapStateToProps(state) {
    return { categories: state.forum.categories };
}

export default connect(mapStateToProps, actions)(Forum);