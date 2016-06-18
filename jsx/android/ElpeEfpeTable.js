import React from 'react';
import {
  StyleSheet,
  Cell,
  View,
  Image,
  Text,
} from 'react-native';
import { KANALISIERT, ERSCHOEPFT, VERZEHRT } from '../../js/constants/elpeEfpeDamageTypes.js';
import ElpeEfpeControl from './ElpeEfpeControl.js';

var styles = StyleSheet.create({
  cell: {
    height: 56,
  },
  cellImage: {
      height: 15,
      width: 10,
  }
});

var ElpeEfpeTable = React.createClass({
    render: function() {
        console.log("TABLE RENDER");
        let count = 0;
        let rows = [];

        let kanalisiert = this.props.values.dmg[KANALISIERT].pending + this.props.values.dmg[KANALISIERT].persisted;
        let erschoepft = this.props.values.dmg[ERSCHOEPFT].pending + this.props.values.dmg[ERSCHOEPFT].persisted;
        let verzehrt = this.props.values.dmg[VERZEHRT].pending + this.props.values.dmg[VERZEHRT].persisted;
        
                let renderedTotalDamage = 0;
        for (let row=0;row<this.props.rows;row++) {
            let cols = [];
            for (let col=0;col<this.props.perCol;col++) {
                let content = <Text></Text>; // mop: &nbsp;
                if (verzehrt > 0) {
                    content = <Image style={styles.cellImage} source={require("../../images/dmg-verzehrt.png")}/>;
                    verzehrt--;
                } else if (erschoepft > 0) {
                    content = <Image style={styles.cellImage} source={require("../../images/dmg-erschoepft.png")}/>;
                    erschoepft--;
                } else if (kanalisiert > 0) {
                    content = <Image style={styles.cellImage} source={require("../../images/dmg-kanalisiert.png")}/>;
                    kanalisiert--;
                }
                let cellStyles = { flex: 1, alignSelf: 'center', borderWidth: 1};
                cols.push(<View style={cellStyles} key={'r' + rows.length + 'c' + col}>{content}</View>);
                renderedTotalDamage++;
                if (renderedTotalDamage == this.props.maximumDamage) {
                    break;
                }
            }
            rows.push(<View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}} key={'r' + rows.length}>{cols}</View>);
            if (renderedTotalDamage == this.props.maximumDamage) {
                break;
            }
        }
        
        let tbody = <View>{rows}</View>
        return (
            <View>
                <Text>{this.props.title}</Text>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginTop: 5, marginBottom: 5}}>
                    <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
                    <ElpeEfpeControl image={require("../../images/dmg-kanalisiert.png")} onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, KANALISIERT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, KANALISIERT)}/>
                    </View>
                    <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
                    <ElpeEfpeControl image={require("../../images/dmg-erschoepft.png")} onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, ERSCHOEPFT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, ERSCHOEPFT)}/>
                                        </View>
                    <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
                    <ElpeEfpeControl image={require("../../images/dmg-verzehrt.png")} onAdd={() => this.props.onAddDamage(this.props.characterKey, this.props.category, VERZEHRT)} onRemove={() => this.props.onRemoveDamage(this.props.characterKey, this.props.category, VERZEHRT)}/>
                                    </View>
                </View>
                {tbody}
            </View>
        )
    }
});

export default ElpeEfpeTable;