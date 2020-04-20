export const searchDataAction = (val)=>{
    return {
        type:"SEARCH_REDUCER",
        payload:val
    }
};

export const isSearchAction = (val)=>{
    return {
        type:"IS_SEARCH",
        payload:val
    }
};

export const showSearchBarAction = (val) => {
    return {
        type: "SHOW_SEARCH_BAR",
        payload: val
    }
};

export const navTitleAction = (val) => {
    return {
        type: "NAV_TITLE",
        payload: val
    }
};

export const imageBasePathAction = (val) => {
    return {
        type: "IMAGE_PATH",
        payload: val
    }
}