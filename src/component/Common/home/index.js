import React, { Component } from 'react';
import ListItems from 'component/ListItems';

import { homePageDataAction } from 'action/homeAction';
import { isSearchAction, searchDataAction } from 'action/searchAction';

import Utility from 'Utility/utility';
import config from 'Utility/config'

// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class HomeLayout extends Component {
    constructor() {
        super();
        this.state = {
            listArr : null,
            currentPage: 1,
            total_pages: 0
        }
        this.arr = [];
    }
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
                this.props._homePageDataAction(res.data.items)
                this.setState({
                    total_pages: res.data.total_pages
                })
            }
            else {
                console.log("Error message ", res.status.status_message)
            }
        }).catch((err) => {
            console.log("Err ", err);
        })
    }

    componentDidUpdate(previousProps) {
        if(this.props._isSearchReducer && previousProps._isSearchReducer !== this.props._isSearchReducer) {
            this.getSearchResult();
        }
    }
    getSearchResult = () => {
        let currentPage = 1;
        let reqObj = {
            url: config.searchList.replace('QUERY', this.props._searchInputValueReducer).replace('PAGE', currentPage),
            method: 'get'
        }
        Utility.ajaxCall(reqObj).then((res) => {
            if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34 && !res.data.errors) {
                this.props._searchDataAction(res.data.results);
                window.addEventListener('scroll', this.loadMore);
                this.setState({
                    currentPage: currentPage,
                    total_pages: res.data.total_pages

                })
            }
            else {
                console.log("Error message ", res.status.status_message)
            }
        }).catch((err) => {
            console.log("Err ", err);
        })
    }
    loadMore = () => {
        let newArry = this.props._searchDataReducer;
        if( this.state.currentPage < this.state.total_pages && (this.refs.loadMore.getBoundingClientRect().top < window.outerHeight + 700)) {
            let currentPage = this.state.currentPage + 1;
            let reqObj = {
                url: config.searchList.replace('QUERY', this.props._searchInputValueReducer).replace('PAGE', currentPage),
                method: 'get'
            }
            Utility.ajaxCall(reqObj).then((res) => {
                if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34) {
                    newArry.push(...res.data.results);
                    this.props._searchDataAction(newArry)
                    this.setState({
                        currentPage: currentPage,
                        total_pages: res.data.total_pages
                    })
                }
                else {
                    console.log("Error message ", res.status.status_message)
                }
            }).catch((err) => {
                console.log("Err ", err);
            })
        }
    }
    render() {
        let listData = this.props._isSearchReducer ? this.props._searchDataReducer : this.props._homePageDataReducer;
        return (
            <div className="home-page-layout">
                <ListItems listsArr={listData} />
                {
                    listData && 
                    listData.length > 0 &&
                    this.state.currentPage < this.state.total_pages &&
                    <div className="load-more" ref="loadMore" style={{visibility: 'hidden', opacity: 0}}>Loading</div>
                }
            </div>
        )
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _homePageDataAction: homePageDataAction,
        _isSearchAction: isSearchAction,
        _searchDataAction: searchDataAction
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        _homePageDataReducer: state.homePageDataReducer,
        _isSearchReducer: state.isSearchReducer,
        _searchDataReducer: state.searchDataReducer,
        _searchInputValueReducer: state.searchInputValueReducer,
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);