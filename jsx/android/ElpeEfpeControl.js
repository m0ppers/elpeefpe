import React from 'react';

import {
    View,
    Image,
    Text
} from 'react-native';
import { Button } from 'react-native-material-design';

var ElpeEfpeControl = React.createClass({
    render: function() {
        return (
            <View style={{alignItems:'center'}}>
                <View>
                    <Button text="+" raised={true} theme="dark" onPress={this.props.onAdd} />
                </View>
                <Image source={this.props.image} style={{
            width: 20,
            height: 40,
            
          }}/>
                <View>
                    <Button text="-" raised={true} theme="dark" onPress={this.props.onRemove} />
                </View>
            </View>           
        )
    }
})

export default ElpeEfpeControl;