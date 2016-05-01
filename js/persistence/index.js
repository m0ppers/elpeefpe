import uuid from 'uuid';

// quick and dirty for now...later whatever async store there is

export default {
    fetchAll: function() {
        let characters = [];
        let savedCharacters = localStorage.getItem('characters');
        
        if (savedCharacters) {
            characters = JSON.parse(savedCharacters);
        }
        
        return Promise.resolve(characters);    
    },
    
    fetch: function(key) {
        return this.fetchAll()
        .then(characters => {
            let characterList = characters.filter(character => {
                return character.key == key;
            });
            if (characterList.length != 1) {
                throw new Error("Couldn't find character");
            }
            return characterList[0];
        });
    },
    
    remove: function(key) {
        return this.fetchAll()
        .then(characters => {
            let characterList = characters.filter(character => {
                return character.key == key;
            });
            if (characterList.length != 1) {
                throw new Error("Couldn't find character");
            }
            let index = characters.indexOf(characterList[0]);
            characters.splice(index, 1);
            localStorage.setItem('characters', JSON.stringify(characters));
        });
    },
    
    save: function(character) {
        return this.fetchAll()
        .then(characters => {
            if (!character.key) {
                character.key = uuid.v1();
                characters.push(character);
            } else {
                let characterList = characters.filter(compCharacter => {
                    return character.key == compCharacter.key;
                })
                if (characterList.length != 1) {
                    throw new Error('Character not found');
                }
                
                let index = characters.indexOf(characterList[0]);
                characters[index] = character;
            }
            localStorage.setItem('characters', JSON.stringify(characters));    
            return character;
        });
    }
}