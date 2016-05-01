import { connect } from 'react-redux';
import ElpeEfpeCharacterEditView from '../ElpeEfpeCharacterEditView.jsx';
import { addCharacter, editCharacter } from '../../../js/actions/elpeEfpeActions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: character => {
            let promise;
            if (character.key) {
                promise = dispatch(editCharacter(character));
            } else {
                promise = dispatch(addCharacter(character));
            }
            
            promise.then(character => {
                WinJS.Navigation.navigate("/character", {characterKey: character.key});
            })
        },
    }
}

export default connect(
  undefined,
  mapDispatchToProps
)(ElpeEfpeCharacterEditView);