import React from 'react';
import ReactWinJS from 'react-winjs';
import ElpeEfpeTable from './containers/ElpeEfpeTable.js';

var ElpeEfpeCharacterView = React.createClass({
    getInitialState: function() {
        return {};
    },
    
    edit: function() {
        WinJS.Navigation.navigate("/edit", {characterKey: this.props.character.key});
    },
    
    delete: function() {
        this.refs.dialog.winControl.show().then(eventObject => {
            // eventObject.result tells you what caused the dialog to get dismissed.
            if (eventObject.result == 'primary') {
                this.props.onRemove(this.props.character.key);
            }
        });
        
    },
    
    backToOverview: function() {
        WinJS.Navigation.navigate("/", {});
    },
    
    render: function() {
        let deleteWarning = (
            <ReactWinJS.ContentDialog
                ref="dialog"
                title="Wirklich löschen?"
                primaryCommandText="Löschen"
                secondaryCommandText="Abbrechen">
            </ReactWinJS.ContentDialog>
        )
        
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
            <div>
                {deleteWarning}
                <div className="nav-header">
                    <button className="win-navigation-backbutton win-disposable" aria-label="Back" title="Back" type="button" onClick={this.backToOverview}><span className="win-back"></span></button>
                    <h1 className="win-h1">{this.props.character.name}</h1>
                </div>
                {elpe}
                {efpe}
                <ReactWinJS.ToolBar className="characterToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="edit"
                        icon="edit"
                        label="Edit"
                        onClick={this.edit}
                        priority={0} />
                    <ReactWinJS.ToolBar.Button
                        key="delete"
                        icon="delete"
                        label="Delete"
                        onClick={this.delete}
                        priority={0} />
                </ReactWinJS.ToolBar>
            </div>
        );
    }
})

export default ElpeEfpeCharacterView;