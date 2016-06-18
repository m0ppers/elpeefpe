import React from 'react';
import ElpeEfpeTable from './containers/ElpeEfpeTable.js';

import {
    Text,
    View,
} from 'react-native';

var ElpeEfpeCharacterView = React.createClass({
    getInitialState: function() {
        return {};
    },

    render: function() {
        // mop: ENOUGH! FCK IT! need to access in the toolbar...
        window.currentCharacter = this.props.character;
        let elpe;
        let efpe;
        if (this.props.character.elpe.value > 0) {
            let title = 'Lebenspunkte ' + this.props.character.elpe.value;
            elpe = (
                <ElpeEfpeTable characterKey={this.props.character.key} category="elpe" maximumDamage={5 * this.props.character.elpe.value} rows={5} perCol={this.props.character.elpe.value} values={this.props.character.elpe} title={title} />
            )
        }
        if (this.props.character.efpe.value > 0) {
            let title = 'Fokuspunkte ' + this.props.character.efpe.value;
            let rows = Math.ceil(this.props.character.efpe.value / 10);
            efpe = (
                <ElpeEfpeTable characterKey={this.props.character.key} category="efpe" maximumDamage={this.props.character.efpe.value} rows={rows} perCol={10} values={this.props.character.efpe} title={title}/>
            )
        }

        return (
            <View>
                <Text>{this.props.character.name}</Text>
                {elpe}
                {efpe}                
            </View>
        );
    }
})

export default ElpeEfpeCharacterView;