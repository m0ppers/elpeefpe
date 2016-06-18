import React from 'react';

import {
    StyleSheet,
    ListView,
    Text,
    View,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

var styles = StyleSheet.create({
    text: {
        fontSize: 30,
        padding: 5,
    }
});

var ElpeEfpeCharacterViewList = React.createClass({
    getInitialState: function () {
        console.log("LIST: getInitialState")
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            "dataSource": ds.cloneWithRows([]),
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        console.log("LIST: componentWillReceiveProps", nextProps.characters.length);
        this.setState({
            "dataSource": this.state.dataSource.cloneWithRows(nextProps.characters),
        });
    },
    
    create: function() {
        this.props.navigator.push({
            name: 'edit',
        });
    },
    
    selectCharacter: function(character) {
        Actions.viewCharacter({character});
    },

    render: function () {
        console.log("LIST: render");
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text onPress={() => {this.selectCharacter(rowData)}} style={styles.text}>{rowData.name}</Text>}
                    />
            </View>
        );
    },
});

export default ElpeEfpeCharacterViewList;