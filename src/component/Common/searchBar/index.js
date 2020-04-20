import React, { Component } from 'react';
import InputBox from 'component/Common/form-fields/inputBox'

import { isSearchAction, searchDataAction, searchInputValueAction } from 'action/searchAction';


// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class SearchBar extends Component {


    handleInput = (value) => {
        if(value && value !=='') {
            this.props._isSearchAction(true);
            this.props._searchInputValueAction(value); 
        }
        else {
            this.props._isSearchAction(false);
            this.props._searchDataAction(null);
        }
    }

    render() {
        return (
            <div className="search-container">
                <form class="search-form">
                    <InputBox handleInput={this.handleInput} placeholder="Search" showIcon={true} iconName="search" />
                </form>
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _isSearchAction: isSearchAction,
        _searchDataAction: searchDataAction,
        _searchInputValueAction: searchInputValueAction
    }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);