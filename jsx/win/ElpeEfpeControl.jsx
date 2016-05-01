import React from 'react';

var ElpeEfpeControl = React.createClass({
    render: function() {
        return (
            <div className="elpeefpe-control">
                <div>
                    <button className="win-button" onClick={this.props.onAdd}>+</button>
                </div>
                <div>
                    <img src={this.props.image}/>
                </div>
                <div>
                    <button className="win-button" onClick={this.props.onRemove}>-</button>
                </div>
            </div>            
        )
    }
})

export default ElpeEfpeControl;