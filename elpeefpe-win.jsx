import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import replicate from 'redux-replicate';
import thunkMiddleware from 'redux-thunk';

import ElpeEfpeCharacterListView from './jsx/win/ElpeEfpeCharacterListView.jsx';
import ElpeEfpeCharacterView from './jsx/win/containers/ElpeEfpeCharacterView.js';
import ElpeEfpeCharacterEditView from './jsx/win/containers/ElpeEfpeCharacterEditView.js';

import reducers from './js/reducers';

import { loadCharacters } from './js/actions/elpeEfpeActions.js';
import { nav } from './js/actions/winjsActions.js';

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(loadCharacters());

var App = React.createClass({
    handleNavigated: function (eventObject) {
        this.props.onNav(eventObject.detail.location, eventObject.detail.state);
    },
    
    componentWillMount: function () {
        WinJS.Navigation.addEventListener("navigated", this.handleNavigated);
        WinJS.Navigation.navigate("/");
    },
    componentWillUnmount: function () {
        WinJS.Navigation.removeEventListener("navigated", this.handleNavigated);
    },
    
    render: function() {
        let character;
        if (this.props.navigation.state && this.props.navigation.state.characterKey) {
            character = this.props.characters.filter(character => {
                return character.key == this.props.navigation.state.characterKey;
            })[0];
        }
        switch(this.props.navigation.location) {
            case '/character':
                return (
                    <ElpeEfpeCharacterView character={character}/>
                )  
                break;
            case '/edit':
                return (
                    <ElpeEfpeCharacterEditView character={character}/>
                )  
                break;
            default:
                return (
                    <ElpeEfpeCharacterListView characters={this.props.characters}/>
                )
        }
    }
});

const mapStateToProps = (state) => {
    return {
        characters: state.characters,
        navigation: state.navigation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNav: (location, state) => {
            dispatch(nav(location, state));
        }
    }    
};

let ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);




ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>, document.getElementById("app"));