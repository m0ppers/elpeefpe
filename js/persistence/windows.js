function uuid(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid) }

export default {
    fetchAll: function () {
        let characters = [];
        let savedCharacters = localStorage.getItem('characters');

        if (savedCharacters) {
            characters = JSON.parse(savedCharacters);
        }

        return Promise.resolve(characters);
    },

    fetch: function (key) {
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

    remove: function (key) {
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

    save: function (character) {
        return this.fetchAll()
            .then(characters => {
                if (!character.key) {
                    character.key = uuid();
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