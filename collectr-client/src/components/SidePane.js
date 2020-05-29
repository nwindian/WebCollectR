import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../SidePane.css';
import SidePaneSearch from './SidePaneSearch.js';

class SidePane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpenLeft: false
        };
    }

    render() {
        if (this.state.isPaneOpenLeft === true) {
            return (
                <SlidingPane
                    className='top-margin'
                    //closeIcon={<div>Some div containing custom close icon.</div>}
                    isOpen={this.state.isPaneOpenLeft}
                    from='left'
                    width='300px'
                    onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
                    onRequestOpen={() => this.setState({ isPaneOpenLeft: true })}>
                    <div><SidePaneSearch changeBookName={this.props.changeBookName} getBooks={this.props.getBooks} /></div>
                </SlidingPane>
            );
        }
        else {
            return (
                <div>
                    <div><SidePaneSearch changeBookName={this.props.changeBookName} getBooks={this.props.getBooks} /> </div>
                    <div className="arrow" onClick={() => this.setState({ isPaneOpenLeft: true })} />
                </div>
            )
        }
    }
}

export default SidePane