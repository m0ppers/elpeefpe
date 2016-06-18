import * as types from '../constants/elpeEfpeActionTypes.js';
import persistenceFactory from '../persistence';
import { VERZEHRT, ERSCHOEPFT, KANALISIERT } from  '../constants/elpeEfpeDamageTypes.js';
import { ELPE_DAMAGE_ROWS } from '../constants/general.js';

export function savingCharacter(character) {
  return {
      type: types.SAVING_CHARACTER,
      character: character,
  }
}

let persistence = persistenceFactory();

export function added(character) {
  return {
    type: types.ADDED_CHARACTER,
    character: character,
  }
}

export function addCharacter(character) {
  if (typeof character != 'object' || character === null) {
    throw new Error('Character is not an object!');
  }
  let newCharacter = {};
  if (typeof character.name != 'string' || character.name.trim().length == 0) {
    throw new Error('Character name must be a non empty string');
  } 
  newCharacter.name = character.name.trim();
  newCharacter.elpe = {
    value: 0,
    dmg: [0,0,0],
  };
  
  newCharacter.efpe = {
    value: 0,
    dmg: [0,0,0],
  };

  if (typeof character.elpe == 'object' && character.elpe !== null) {
    newCharacter.elpe.value = character.elpe.value || 0;
  }
 
  if (typeof character.efpe == 'object' && character.efpe !== null) {
    newCharacter.efpe.value = character.efpe.value || 0;
  }
  return dispatch => {
    dispatch(savingCharacter(newCharacter));
    return persistence.save(newCharacter)
    .then(character => {
      dispatch(added(character));
      return character;
    });
  }
}

let sortOutDamageOverflow = function(category, property) {
  let totalDamage = property.dmg.reduce((previous, value) => previous + value, 0);
  let totalMaxDamage;
  if (category == 'elpe') {
    totalMaxDamage = (property.value * ELPE_DAMAGE_ROWS);
  } else {
    totalMaxDamage = property.value;
  }
  let diff = totalDamage - totalMaxDamage;
  if (diff <= 0) {
    return property;
  }
  
  for (let i in property.dmg) {
    property.dmg[i] -= diff;
    if (property.dmg[i] >= 0) {
      break;
    } else {
      diff = property.dmg[i] * -1;
    }
  }
  return property;
}

export function editCharacter(character) {
  return dispatch => {
    return persistence.fetch(character.key)
    .then(savedCharacter => {
      savedCharacter.name = character.name;
      if (character.elpe && character.elpe.value >= 0) {
        savedCharacter.elpe.value = character.elpe.value;
        savedCharacter.elpe = sortOutDamageOverflow('elpe', savedCharacter.elpe);
      }
      if (character.efpe && character.efpe.value >= 0) {
        savedCharacter.efpe.value = character.efpe.value;
        savedCharacter.efpe = sortOutDamageOverflow('efpe', savedCharacter.efpe);
      }
      dispatch(savingCharacter(savedCharacter));
      return persistence.save(savedCharacter)
      .then(character => {
        dispatch(updatedCharacter(character));
        return character;
      });
    })
  }
}

export function removingCharacter(characterKey) {
  return {
    type: types.REMOVING_CHARACTER,
    characterKey,
  };
}

export function removedCharacter(characterKey) {
  return {
    type: types.REMOVED_CHARACTER,
    characterKey,
  };
}

export function removeCharacter(characterKey) {
  return dispatch => {
    dispatch(removingCharacter(characterKey));
    return persistence.remove(characterKey)
    .then(() => {
      return dispatch(removedCharacter(characterKey));
    })
  }
}

export function addingDamage(characterKey, damageCategory, damageType) {
  return {
    type: types.ADDING_DAMAGE,
    characterKey,
    damageCategory,
    damageType,
  }
}

export function removingDamage(characterKey, damageCategory, damageType) {
  return {
    type: types.REMOVING_DAMAGE,
    characterKey,
    damageCategory,
    damageType,
  }
}

export function updatedCharacter(character) {
  return {
    type: types.UPDATED_CHARACTER,
    character,
  }
}

export function addDamage(characterKey, damageCategory, damageType) {
  return dispatch => {
    dispatch(addingDamage(characterKey, damageCategory, damageType));
    return persistence.fetch(characterKey)
    .then(character => {
      let totalDamage = character[damageCategory].dmg.reduce((previous, value) => previous + value, 0);
      let totalMaxDamage;
      if (damageCategory == 'elpe') {
        totalMaxDamage = (character[damageCategory].value * ELPE_DAMAGE_ROWS);
      } else {
        totalMaxDamage = character[damageCategory].value;
      }
      let diff = totalDamage - totalMaxDamage;
      
      if (diff >= 0) {
        let currentDamageType = KANALISIERT;
        while (currentDamageType < VERZEHRT) {
          if (character[damageCategory].dmg[currentDamageType] > 0) {
            character[damageCategory].dmg[currentDamageType + 1]++;
            character[damageCategory].dmg[currentDamageType]--;
            if (currentDamageType == damageType) {
              break;
            }
          }
          currentDamageType++;
        }
      } else {
        character[damageCategory].dmg[damageType]++;
      }
      persistence.save(character)
      .then(character => {
        dispatch(updatedCharacter(character));        
      })
    });
  };
}

export function removeDamage(characterKey, damageCategory, damageType) {
  return dispatch => {
    dispatch(removingDamage(characterKey, damageCategory, damageType));
    return persistence.fetch(characterKey)
    .then(character => {
      if (character[damageCategory].dmg[damageType] > 0) {
        character[damageCategory].dmg[damageType]--;
        persistence.save(character)
        .then(character => {
          dispatch(updatedCharacter(character));        
        })
      }
    });
  };
}

export function loadingCharacters() {
  return {
    type: types.LOADING,
  }
}

export function loadedCharacters(characters) {
  return {
    type: types.LOADED,
    characters: characters,
  }
}

export function loadCharacters() {
  return dispatch => {
    dispatch(loadingCharacters());
    return persistence.fetchAll()
    .then(characters => {
      dispatch(loadedCharacters(characters));
    })
  }
}