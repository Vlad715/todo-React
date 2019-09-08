import React, {Component} from 'react';
import './search-panel.css';

export default class  SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });

        this.props.onSearchChange( term )
    };


    render () {

        const searchStyle = {
            fontSize: '15px'
        }

        return (
            <input type="text" className="search-input"
                style={searchStyle}
                placeholder = "Type here to search"
                onChange={this.onSearchChange}
                value={this.state.term}/>
        )
    };
};