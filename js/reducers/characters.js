import { ADDING_DAMAGE, REMOVING_DAMAGE, ADDED_CHARACTER, ADDING_CHARACTER, UPDATED_CHARACTER, LOADED, LOADING } from '../constants/elpeEfpeActionTypes.js';
import update from 'react-addons-update';

const initialState = [];

let findCharacterIndex = function(state, characterKey) {
  var characters = state.filter(character => {
    return character.key == characterKey;
  });

  if (characters.length != 1) {
    throw new Error('Character not found!');
  }
  return state.indexOf(characters[0]);
}

let createFrontendCharacter = function(backendCharacter) {
  let character = {
    key: backendCharacter.key,
    name: backendCharacter.name,
    elpe: {
      value: backendCharacter.elpe.value,
      dmg: backendCharacter.elpe.dmg.map(backendElpe => {
        return {
          pending: 0,
          persisted: backendElpe,
        }
      })
    },
    efpe: {
      value: backendCharacter.efpe.value,
      dmg: backendCharacter.efpe.dmg.map(backendEfpe => {
        return {
          pending: 0,
          persisted: backendEfpe,
        }
      })
    },
  }
  return character;
}

export default function characters(state = initialState, action) {
  switch (action.type) {
    case ADDING_DAMAGE:
      var characterIndex = findCharacterIndex(state, action.characterKey);
      return update(state, {
        [characterIndex]: {
          [action.damageCategory]: {
            dmg: {
              [action.damageType]: {
                pending: {
                  $set: state[characterIndex][action.damageCategory].dmg[action.damageType].pending + 1,
                }
              }
            }
          }
        }
      });
      break;
    case REMOVING_DAMAGE:
      var characterIndex = findCharacterIndex(state, action.characterKey);
      state[characterIndex][action.damageCategory].dmg[action.damageType].pending--;
      break;
    case UPDATED_CHARACTER:
      var characterIndex = findCharacterIndex(state, action.character.key);
      var newState = update(state, {
        [characterIndex]: { $set: createFrontendCharacter(action.character) }
      });
      return newState;
      break;
    case ADDED_CHARACTER:
      return update(state, {
        $push: [createFrontendCharacter(action.character)],
      });
      break;
    case LOADED:
      return action.characters.map(createFrontendCharacter);
      break;
  }
  return state;
}