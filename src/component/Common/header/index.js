import React, { Component } from 'react';
import SearchBar from 'component/Common/searchBar';


import Utility from 'Utility/utility';
import config from 'Utility/config'

// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { imageBasePathAction } from 'action/searchAction';

// CSS
import 'css/common/header/header.css';


class Header extends Component {
    componentDidMount() {
        this.getImageBasePath();
    }
    getImageBasePath = () => {
        let reqObj = {
            url: config.imagePath,
            method: 'get'
        }
        Utility.ajaxCall(reqObj).then((res) => {
            if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34) {
                this.props._imageBasePathAction(res.data);
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
            <header className="header-content">
                <nav className="display-flex flex-vertical-center shadow-1">
                    <div className="header-left-cotent">
                        {
                        this.props._showSearchBarReducer ? 
                            <SearchBar />
                            :
                            <React.Fragment>{this.props._navTitleReducer}</React.Fragment>
                        }
                    </div>
                    <div className="header-right-content">
                        <a href="/">
                            <span class="material-icons">home</span>
                        </a>
                    </div>

                </nav>
            </header>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _imageBasePathAction: imageBasePathAction
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        _showSearchBarReducer: state.showSearchBarReducer,
        _navTitleReducer: state.navTitleReducer
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(Header);