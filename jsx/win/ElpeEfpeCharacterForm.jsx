import React from 'react';
import update from 'react-addons-update';

var ElpeEfpeCharacterForm = React.createClass({
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
    
    nameChange: function(event) {
        this.setState({name: event.target.value.replace(/^\s/, '')});
    },
    
    elpeChange: function(event) {
        this.setState(update(this.state, {
            elpe: {
                value: {$set: parseInt(event.target.value, 10)}
            }
        }));
    },
    
    efpeChange: function(event) {
        this.setState(update(this.state, {
            efpe: {
                value: {$set: parseInt(event.target.value, 10)}
            }
        }));
    },
    
    formValid: function() {
        return this.state.name.replace(/\s/, '').length > 0
            && this.state.elpe.value >=0
            && this.state.efpe.value >=0;
    },
    
    save: function(event) {
        event.preventDefault();
        this.setState({name: this.state.name.trim()});
        this.props.save(this.state);
    },

    render: function() {
        return (
            <form onSubmit={this.save}>
                <label for="name">Charaktername</label>
                <input id="name" required type="text" className="win-textbox" value={this.state.name} placeholder="Charaktername" onChange={this.nameChange}/>
                <label for="elpe">Lebenspunkte</label>
                <input id="elpe" required type="number" className="win-textbox" value={this.state.elpe.value} placeholder="Lebenspunkte" min="0" onChange={this.elpeChange}/>
                <label for="elpe">Fokuspunkte</label>
                <input id="efpe" required type="number" className="win-textbox" value={this.state.efpe.value} placeholder="Fokuspunkte" min="0" onChange={this.efpeChange}/>
                <button className="win-button win-button-primary" disabled={!this.formValid()}>Speichern</button>
            </form>
        );
    }
});

export default ElpeEfpeCharacterForm;