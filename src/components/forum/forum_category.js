import React, { Component } from 'react';

class ForumCategory extends Component {

    renderSubCategories = (subcategories, parentId) => {
        return subcategories.map( subcategory => {
            return (
                <tr key={parentId + '.' + subcategory.id}>
                    <th className="category-subcategory-metadata">
                        <i className="fa fa-comments-o fa-2x category-subcategory-icon" aria-hidden="true"> </i>
                        <div className="category-subcategory-td-block">
                            <div className="category-subcategory-title">{subcategory.title}</div>
                            <div className="category-subcategory-description">{subcategory.description}</div>
                        </div>
                    </th>
                    <th className="category-subcategory-metadata">TODO</th>
                    <th className="category-subcategory-metadata">TODO</th>
                </tr>
            );
        });
    };


    render() {
        return (
            <div className="category-wrapper">
                <h1 className="category-name">{this.props.category.title}</h1>
                <p className="category-description">{this.props.category.description}</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Forum</th>
                        <th>t/p</th>
                        <th>Last Post</th>
                    </tr>
                    {this.renderSubCategories(this.props.category.subcategories, this.props.category.id)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ForumCategory;