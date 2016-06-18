import { connect } from 'react-redux';
import ElpeEfpeCharacterListView from '../ElpeEfpeCharacterListView.js';

const mapStateToProps = (state) => {
    return {
        characters: state.characters,
    }
}

export default connect(
    mapStateToProps
)(ElpeEfpeCharacterListView);