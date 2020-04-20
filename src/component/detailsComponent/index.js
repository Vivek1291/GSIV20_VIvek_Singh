import React, { Component } from 'react';

import { showSearchBarAction, navTitleAction } from 'action/searchAction';

import Utility from 'Utility/utility';
import config from 'Utility/config'

// Store import
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Css
import 'css/detailsComponent/detailsComponent.css';



class HomeLayout extends Component {
    constructor() {
        super();
        this.state = {
            pageData: null
        }
    }
    componentDidMount() {
        this.getMovieData()
        console.log(this.props.match.params.id)
    }

    getMovieData = () => {
        if(this.props.match.params && this.props.match.params.id) {

            let reqObj = {
                url: config.movieDetails.replace('ID', this.props.match.params.id),
                method: 'get'
            }
            Utility.ajaxCall(reqObj).then((res) => {
                if(res.data && res.data.status_code !== 7 && res.data.status_code !== 34) {
                    console.log(res)
                    this.setState({
                        pageData: res.data
                    })
                }
                else {
                    console.log("Error message ", res.status.status_message)
                }
            }).catch((err) => {
                console.log("Err ", err);
            })
        }
        else {
            console.log("Error movie Id not found");
        }
    }

    componentWillUnmount() {
        this.props._navTitleAction(''); 
        this.props._showSearchBarAction(true);
    }

    render() {
        const {pageData} = this.state
        return (
            <div className="detail-page-layout">
                {
                    pageData ? 
                    <div className="display-flex detail-page-cntr">
                        <div className="detail-page-left-container">
                            <div className="details-page-image-cntr">
                                <img src={(this.props._imageBasePathReducer.images ? this.props._imageBasePathReducer.images.base_url : '')+ (this.props._imageBasePathReducer.images && this.props._imageBasePathReducer.images.backdrop_sizes && this.props._imageBasePathReducer.images.backdrop_sizes.length ? this.props._imageBasePathReducer.images.backdrop_sizes[0] : '') + pageData.poster_path} alt="" />
                            </div>
                        </div>
                        <div className="detail-page-right-container">
                            <h2 className="detail-page-title">{pageData.original_title} <span>{pageData.vote_average}</span></h2>
                            <div className="detail-section add-spacing">Year | Lenght | Director</div>
                            <div className="movie-cast-detail-section add-spacing">Cast: Actor1, Actor2</div>
                            <div className="movie-description add-spacing">Description: {pageData.overview}</div>
                        </div>
                    </div>
                    :
                    <div className="loader"></div>
                }
            </div>
        )
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _showSearchBarAction: showSearchBarAction,
        _navTitleAction: navTitleAction
    }, dispatch);
}

function mapStateToProps(state) {
    console.log(state)
    return {
        _imageBasePathReducer: state.imageBasePathReducer
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);