import { connect } from 'react-redux';
import ElpeEfpeTable from '../ElpeEfpeTable.js';
import { addDamage, removeDamage } from '../../../js/actions/elpeEfpeActions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onAddDamage: (characterKey, damageCategory, damageType) => {
            dispatch(addDamage(characterKey, damageCategory, damageType));
        },
        onRemoveDamage: (characterKey, damageCategory, damageType) => {
            dispatch(removeDamage(characterKey, damageCategory, damageType));
        },
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(ElpeEfpeTable);