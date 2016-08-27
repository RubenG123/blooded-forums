import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ThreadList from './thread_list';
import PageButtons from '../page_buttons';

class Threads extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //always? get subcategory threads, check query first
        const page = this.getPage(this.props);
        this.props.getSubCategoryThreads(this.props.params.id, page);

        //if there is no overall category data, make a call to get a specific subcategory data
        if(!this.props.categories) {
            this.props.getSubCategoryData(this.props.params.id);
        }
    }

    componentWillUpdate(nextProps) {
        if(nextProps.location.query.page != this.getPage(this.props)) {
            this.props.getSubCategoryThreads(nextProps.params.id, this.getPage(nextProps));
        }
    }

    getSubCategory = () => {
        if(this.props.categories) {
            for(var i = 0; i < this.props.categories.length; ++i) {
                for(var j = 0; j < this.props.categories[i].subcategories.length; ++j) {
                    if(this.props.categories[i].subcategories[j].id == this.props.params.id) {
                        return this.props.categories[i].subcategories[j];
                    }
                }
            }
        } else {
            return this.props.subcategory;
        }
    };

    getPage = (props) => {
        if(props.location.query.page) {
            return props.location.query.page;
        } else {
            return 1;
        }
    };

    render() {
        const subcategory = this.getSubCategory();
        const page = this.getPage(this.props);

        if (this.props.categories != null || this.props.subcategory != null) {
            return (
                <div>
                    <ThreadList subcategory={subcategory} threads={this.props.threads} id={this.props.params.id} page={page}/>
                    <div className="page-list-wrapper">
                        <button className="page-button page-button-page" disabled>Pages:</button>
                        <PageButtons totalThreads={subcategory.thread_count} currentPage={page} pathName={this.props.location.pathname}/>
                    </div>
                </div>
            );
        }

        return (
            <div>Loading...</div>
        );
    }

}

function mapStateToProps(state) {
    return {
        categories: state.forum.categories,
        subcategory: state.forum.subcategory,
        threads: state.forum.threads
    };
}

export default connect(mapStateToProps, actions)(Threads);