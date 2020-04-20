import React, { Component } from 'react';
import ListItems from 'component/ListItems';

import { homePageDataAction } from 'action/homeAction';

import Utility from 'Utility/utility';
import config from 'Utility/config'

// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class HomeLayout extends Component {

    componentDidMount() {
        this.getListData()
    }

    getListData = () => {
        let reqObj = {
            url: config.movieList,
            method: 'get'
        }
        Utility.ajaxCall(reqObj).then((res) => {
            if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34) {
                console.log(res)
                this.props._homePageDataAction(res.data)
            }
            else {
                console.log("Error message ", res.status.status_message)
            }
        }).catch((err) => {
            console.log("Err ", err);
        })
    }

    render() {
        let listData = this.props._isSearchReducer ? this.props._searchDataReducer : this.props._homePageDataReducer;
        return (
            <div className="home-page-layout">
                <ListItems data={listData} />
            </div>
        )
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _homePageDataAction: homePageDataAction
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        _homePageDataReducer: state.homePageDataReducer,
        _isSearchReducer: state.isSearchReducer,
        _searchDataReducer: state.searchDataReducer
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);