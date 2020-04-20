export const homePageDataReducer = (state=null,action)=>{

    if(action.type==="HOME_PAGE_ACTION")
        return action.payload;

    return state;
};