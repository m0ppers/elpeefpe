import React from 'react';
import {Toolbar} from 'react-native-material-design';
import {Actions} from 'react-native-router-flux';

let NavBar = React.createClass({
    render: function() {
        let actions = this.props.actions;
        if (this.props.actionsFactory) {
            actions = this.props.actionsFactory(this.props);
        }
        console.log("ACTIONS", actions)
        
        let props = {
            title: this.props.title || this.props.getTitle(this.props),
            actions,
        }
        
        if (this.props.navigationState.index > 0) {
            props.icon = "arrow-back";
            props.onIconPress = Actions.pop;
        }
        
        
        return (
            <Toolbar {...props}/>
        )
    }
});

export default NavBar;