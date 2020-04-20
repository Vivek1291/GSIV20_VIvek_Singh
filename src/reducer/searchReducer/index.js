export const searchDataReducer = (state=null,action)=>{

    if(action.type === "SEARCH_REDUCER")
        return action.payload;

    return state;
};

export const isSearchReducer = (state=false,action)=>{

    if(action.type === "IS_SEARCH")
        return action.payload;

    return state;
};

export const showSearchBarReducer = (state=true, action) => {
    if(action.type === "SHOW_SEARCH_BAR")
        return action.payload;
    return state
}

export const navTitleReducer = (state='', action) => {
    if(action.type === "NAV_TITLE")
        return action.payload
    return state
}


export const imageBasePathReducer = (state='', action) => {
    if(action.type === "IMAGE_PATH")
        return action.payload
    return state
}