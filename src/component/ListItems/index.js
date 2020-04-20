import React, { Component } from 'react';
import Cards from 'component/Cards';

// Css
import 'css/listContainer/listContainer.css';


class ListItems extends Component {
    render() {
        console.log(this.props.data)
        const {data} = this.props;
        let listsArr;
        if(data && data.results) {
            listsArr = data.results
        }
        else if(data && data.items){
            listsArr = data.items
        }
        return (
            <div className="list-containers clearfix">
                {
                    listsArr ? 
                    <React.Fragment>
                    {
                        listsArr.length > 0 ?
                        listsArr.map((item, index) => {
                            return <div className="list-contents">
                                <Cards item={item} />
                            </div>
                        })
                        :
                        <div>No result found</div>
                    }
                    </React.Fragment>
                    :
                    <div className="loader"></div>
                }
            </div>
        )
    }

}

export default ListItems;