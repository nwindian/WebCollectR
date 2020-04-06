import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../index.css';

class SidePaneTitle extends Component {

 
    render() {
        return (
            <div>
                <div id = "logoSmall"> Collectr </div>
            </div>
            )
    }
}

export default SidePaneTitle