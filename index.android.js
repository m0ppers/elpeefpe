/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ToolbarAndroid,
  View
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

import NavBar from './jsx/android/NavBar.js';
import ElpeEfpeCharacterListView from './jsx/android/containers/ElpeEfpeCharacterListView.js';
import ElpeEfpeCharacterEditView from './jsx/android/containers/ElpeEfpeCharacterEditView.js';
import ElpeEfpeCharacterView from './jsx/android/ElpeEfpeCharacterView.js';

import characters from './js/reducers/characters.js';

import { loadCharacters } from './js/actions/elpeEfpeActions.js';

let reducers = combineReducers({
  characters,
})

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers);
store.dispatch(loadCharacters());

const RouterWithRedux = connect()(Router);

const mapDispatchToProps = (dispatch) => {
    return {
        onRemove: characterKey => {
            return dispatch(removeCharacter(characterKey))
            .then(() => {
                dispatch(loadCharacters());
                WinJS.Navigation.navigate("/", {});
            });
        }
    }
}

var elpeefpe = React.createClass({
  render: function() {
    var initialRoute = {name: 'list'};
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene
            key="list"
            component={ElpeEfpeCharacterListView}
            title="Charakterliste "
            navBar={NavBar}
            actions={[{icon: 'add', onPress: Actions.createCharacter}]}
            sceneStyle={{paddingTop: 56 }}
            >
          </Scene>
          <Scene
            key="createCharacter"
            component={ElpeEfpeCharacterEditView}
            title="Charakter erstellen"
            navBar={NavBar}
            sceneStyle={{paddingTop: 56}}
            >
          </Scene>
          <Scene
            key="editCharacter"
            component={ElpeEfpeCharacterEditView}
            getTitle={props => props.character.name + " editieren"}
            navBar={NavBar}
            sceneStyle={{paddingTop: 56}}
            >
          </Scene>
          <Scene
            key="viewCharacter"
            component={ElpeEfpeCharacterView}
            navBar={NavBar}
            getTitle={props => props.character.name}
            sceneStyle={{paddingTop: 56}}
            actions={[{icon: 'edit', onPress: () => Actions.editCharacter({character: window.currentCharacter})}, {icon: 'delete'}]}
            >
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
});

AppRegistry.registerComponent('elpeefpe', () => elpeefpe);

module.exports = elpeefpe;