import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Store import
import { connect } from 'react-redux';

// Css
import 'css/cards/card.css';


class Cards extends Component {

    render() {
        let {item} = this.props;
        return (
            <div className="card shadow-1">
                { item &&
                    <Link to={"/details/" + item.id} className="link-container">
                        <div className="image-container">
                            <img src={(this.props._imageBasePathReducer.images ? this.props._imageBasePathReducer.images.base_url : '')+ (this.props._imageBasePathReducer.images && this.props._imageBasePathReducer.images.backdrop_sizes && this.props._imageBasePathReducer.images.backdrop_sizes.length ? this.props._imageBasePathReducer.images.backdrop_sizes[0] : '') + item.poster_path}  alt="" />
                        </div>
                        <div className="content">
                            <div className="caption display-flex">
                                <span className="left-content">{item.original_title}</span>
                                <span className="right-content">{item.vote_average}</span>
                            </div>
                            <div className="description">{item.overview}</div>
                        </div>
                    </Link>
                }   
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log(state)
    return {
        _imageBasePathReducer: state.imageBasePathReducer
    };

}

export default connect(mapStateToProps, null)(Cards);
