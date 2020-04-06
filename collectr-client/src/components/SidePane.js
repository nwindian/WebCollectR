import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../SidePane.css';
import SidePaneTitle from './SidePaneTitle.js';
import SidePaneSearch from './SidePaneSearch.js';

class SidePane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpenLeft: false
        };
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }
 
    render() {
        if(this.state.isPaneOpenLeft == true){
    		return <div ref={ref => this.el = ref}>
            <SlidingPane
                //closeIcon={<div>Some div containing custom close icon.</div>}
                isOpen={ this.state.isPaneOpenLeft }
                title= {<SidePaneTitle/>}
                from='left'
                width='300px'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }
                onRequestOpen={ () => this.setState({isPaneOpenLeft:true })}>
                <div><SidePaneSearch changeBookName={this.props.changeBookName} handleSearch={this.props.handleSearch}/></div>
            </SlidingPane>
        </div>;
    	}
    	else{
    		return (
    			<div>
    			<div><SidePaneSearch /> </div>
    			<div className="arrow" onClick={() => this.setState({ isPaneOpenLeft: true })} />
    			</div>
    		)
    	}
    }
}

export default SidePane