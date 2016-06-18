import React from 'react';
import update from 'react-addons-update';

import TextField from 'react-native-md-textinput';
import {Button} from 'react-native-material-design';

import {
    Text,
    TextInput,
    View,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import ToolbarAndroid from 'ToolbarAndroid';

let ElpeEfpeCharacterEditView = React.createClass({
    getInitialState: function() {
        let state;
        if (this.props.character) {
            state = update(this.props.character, {});
        } else {
            state = {
                name: '',
                elpe: {
                    value: 0,
                },
                efpe: {
                    value: 0,
                }
            }
        }
        return state;
    },
    
    nameChange: function(text) {
        this.setState({name: text.replace(/^\s/, '')});
    },
    
    elpeChange: function(text) {
        console.log("TTHE TEXT", text);
        this.setState(update(this.state, {
            elpe: {
                value: {$set: parseInt(text, 10)}
            }
        }));
    },
    
    efpeChange: function(text) {
        this.setState(update(this.state, {
            efpe: {
                value: {$set: parseInt(text, 10)}
            }
        }));
    },
    
    formValid: function() {
        return this.state.name.replace(/\s/, '').length > 0
            && this.state.elpe.value >=0
            && this.state.efpe.value >=0;
    },
    
    buttonPressed: function() {
        if (this.formValid()) {
            this.props.onSave(this.state)
            .then(character => {
                Actions.viewCharacter({character});
            })
        }
    },
    
    render: function() {
        return (
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, margin: 20}}>
                <TextField label={'Charaktername'} dense={true} value={this.state.name} onChangeText={this.nameChange}/>
                <TextField label={'Lebenspunkte'} dense={false} value={this.state.elpe.value.toString()} onChangeText={this.elpeChange} keyboardType = 'numeric'/>
                <TextField label={'Fokuspunkte'} dense={false} value={this.state.efpe.value.toString()} onChangeText={this.efpeChange} keyboardType = 'numeric'/>

                <Button value="Speichern" onPress={this.buttonPressed}></Button>
            </View>
        )
    }
});

export default ElpeEfpeCharacterEditView;