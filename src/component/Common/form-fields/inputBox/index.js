import React, { Component } from 'react';

// Css
import 'css/common/form-fields/inputBox/inputBox.css';


class InputBox extends Component {
    constructor(props) {
        super();
        this.state = {
            inputValue: ''
        }
    }

    handleOnChange = (event)=> {
        this.setState({
            inputValue: event.target.value
        })
        this.props.handleInput(event.target.value)
    }

    render() {
        return (
            <div className="input-box-container">
                {
                    this.props.showIcon &&
                    <span class="material-icons icon-left">{this.props.iconName}</span>
                }
                <input autoComplete="off" maxLength="160" ref="searchInput" name="txtQ" placeholder={this.props.placeholder} type="text" className="input-box" onChange={this.handleOnChange} value={this.state.inputValue} />
            </div>
        )
    }

}
export default InputBox;