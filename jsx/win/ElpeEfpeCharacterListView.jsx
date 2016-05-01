import React from 'react';
import ReactWinJS from 'react-winjs';

var ElpeEfpeCharacterListView = React.createClass({
    itemRenderer: ReactWinJS.reactRenderer(function (item) {
        return <div className="list-item win-h3">{item.data.name}</div>;
    }),
    
    selectCharacter: function(eventObject) {
        eventObject.detail.itemPromise.then(item => {
            WinJS.Navigation.navigate("/character", {
                characterKey: item.data.key,
            });
        });
    },
    
    getInitialState: function () {
        return {
            layout: { type: WinJS.UI.ListLayout },
            selected: null,
        };
    },
    
    add: function() {
        WinJS.Navigation.navigate("/edit", {});
    },
    
    render: function() {
        let characterList = new WinJS.Binding.List(this.props.characters);
        return (
            
            <div className="list-wrapper">
                <ReactWinJS.ListView
                        className="listViewExample win-selectionstylefilled"
                        itemDataSource={characterList.dataSource}
                        itemTemplate={this.itemRenderer}
                        layout={this.state.layout}
                        onItemInvoked={this.selectCharacter}
                        selectionMode="single"
                        tapBehavior="directSelect" />

                <ReactWinJS.ToolBar className="characterToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        onClick={this.add}
                        priority={0} />
                </ReactWinJS.ToolBar>
            </div>
        )
    }
});

export default ElpeEfpeCharacterListView;