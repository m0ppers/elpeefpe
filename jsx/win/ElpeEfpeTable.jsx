import React from 'react';
import ElpeEfpeControl from './ElpeEfpeControl.jsx';
import { KANALISIERT, ERSCHOEPFT, VERZEHRT } from '../../js/constants/elpeEfpeDamageTypes.js';

var ElpeEfpeTable = React.createClass({
    render: function() {
        let count = 0;
        let rows = [];

        let kanalisiert = this.props.values.dmg[KANALISIERT].pending + this.props.values.dmg[KANALISIERT].persisted;
        let erschoepft = this.props.values.dmg[ERSCHOEPFT].pending + this.props.values.dmg[ERSCHOEPFT].persisted;
        let verzehrt = this.props.values.dmg[VERZEHRT].pending + this.props.values.dmg[VERZEHRT].persisted;
        
        let renderedTotalDamage = 0;
        for (let row=0;row<this.props.rows;row++) {
            let cols = [];
            for (let col=0;col<this.props.perCol;col++) {
                let content = "\u00a0"; // mop: &nbsp;
                if (verzehrt > 0) {
                    content = <img src="images/dmg-verzehrt.svg"/>;
                    verzehrt--;
                } else if (erschoepft > 0) {
                    content = <img src="images/dmg-erschoepft.svg"/>;
                    erschoepft--;
                } else if (kanalisiert > 0) {
                    content = <img src="images/dmg-kanalisiert.svg"/>;
                    kanalisiert--;
                }
                cols.push(React.createElement('td', {key: 'c' + count++}, content));
                renderedTotalDamage++;
                if (renderedTotalDamage == this.props.maximumDamage) {
                    break;
                }
            }
            rows.push(React.createElement('tr', {'key': 'r' + rows.length}, cols));
            if (renderedTotalDamage == this.props.maximumDamage) {
                break;
            }
        }
        let tbody = React.createElement('tbody', {}, rows);
        return (
            <div className="elpeefpe-table">
                <h3 className="win-h3">{this.props.title}</h3>
                <div className="elpeefpe-controls">
                    <ElpeEfpeControl image="images/dmg-kanalisiert.svg" onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, KANALISIERT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, KANALISIERT)}/>
                    <ElpeEfpeControl image="images/dmg-erschoepft.svg" onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, ERSCHOEPFT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, ERSCHOEPFT)}/>
                    <ElpeEfpeControl image="images/dmg-verzehrt.svg" onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, VERZEHRT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, VERZEHRT)}/>
                </div>
                <table className="elpeefpe-table" width="100%" height="100%">
                    {tbody}
                </table>
            </div>
        )
    }
})

export default ElpeEfpeTable;