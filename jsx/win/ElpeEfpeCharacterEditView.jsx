import React from 'react';
import ElpeEfpeCharacterForm from './ElpeEfpeCharacterForm.jsx';

var ElpeEfpeCharacterEditView = React.createClass({
    save: function(character) {
        this.props.onSave(character)
    },
    
    render: function() {
        return (
            <ElpeEfpeCharacterForm save={this.save} character={this.props.character}/>
        )
    }
});

export default ElpeEfpeCharacterEditView;