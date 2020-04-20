import { combineReducers } from "redux";

import { homePageDataReducer } from 'reducer/homeReducer';
import { searchDataReducer, isSearchReducer, showSearchBarReducer,  navTitleReducer, imageBasePathReducer, searchInputValueReducer} from 'reducer/searchReducer'

const allReducers = combineReducers(
    {
        homePageDataReducer:homePageDataReducer,
        searchDataReducer:searchDataReducer,
        isSearchReducer: isSearchReducer,
        showSearchBarReducer: showSearchBarReducer,
        navTitleReducer: navTitleReducer,
        imageBasePathReducer: imageBasePathReducer,
        searchInputValueReducer: searchInputValueReducer
    }
);

export default allReducers