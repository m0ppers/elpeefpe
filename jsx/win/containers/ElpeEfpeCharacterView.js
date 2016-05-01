import { connect } from 'react-redux';
import ElpeEfpeCharacterView from '../ElpeEfpeCharacterView.jsx';
import { removeCharacter, loadCharacters } from '../../../js/actions/elpeEfpeActions.js';

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

export default connect(
  undefined,
  mapDispatchToProps
)(ElpeEfpeCharacterView);