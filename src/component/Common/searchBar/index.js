import React, { Component } from 'react';
import InputBox from 'component/Common/form-fields/inputBox'

import { isSearchAction, searchDataAction } from 'action/searchAction';

import Utility from 'Utility/utility';
import config from 'Utility/config'

// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class SearchBar extends Component {

    handleInput = (value) => {
        if(value && value !=='') {
            this.getSearchResult(value);
        }
        else {
            this.props._isSearchAction(false)
        }
    }

    getSearchResult = (value) => {
        let reqObj = {
            url: config.searchList + ('?query=' + value),
            method: 'get'
        }
        Utility.ajaxCall(reqObj).then((res) => {
            if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34 && !res.data.errors) {
                this.props._isSearchAction(true)
                this.props._searchDataAction(res.data)
            }
            else {
                console.log("Error message ", res.status.status_message)
            }
        }).catch((err) => {
            console.log("Err ", err);
        })
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
        _searchDataAction: searchDataAction
    }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);